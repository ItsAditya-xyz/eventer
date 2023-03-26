import json
from flask import Flask, request, jsonify
from flask.wrappers import Response
from flask.globals import request, session
import requests
from decouple import config
from werkzeug.exceptions import abort
from werkzeug.utils import redirect
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import os
import pathlib
import google
import jwt
from flask_cors import CORS
from flask_mysqldb import MySQL
import smtplib
import ssl
import binascii
from base58 import b58decode_check
from ecdsa import SECP256k1, VerifyingKey, SigningKey
import deso
import smtplib
import ssl

# TODO: add credentials for google login in .evn and use them here
app = Flask(__name__)

CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
app.config["Access-Control-Allow-Headers"] = "Content-Type"


app.config["MYSQL_HOST"] = config("MYSQL_HOST")
app.config["MYSQL_USER"] = config("MYSQL_USER")
app.config["MYSQL_PASSWORD"] = config("MYSQL_PASSWORD")
DB_NAME = config("MYSQL_DB")
app.config["MYSQL_DB"] = DB_NAME


mysql = MySQL(app)
# bypass http

GMAIL_PASSWORD = config("GMAIL_PASSWORD")
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app.secret_key = config("GOOGLE_CLIENT_SECRET")
GOOGLE_CLIENT_ID = config("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent, "client-secret.json")  # get this file from google console
algorithm = config("ALGORITHM")
BACKEND_URL = config("BACKEND_URL")
FRONTEND_URL = config("FRONTEND_URL")
EVENTER_SEED_HEX = config("EVENTER_SEED_HEX")
EVENTER_PUBLIC_KEY = config("EVENTER_PUBLIC_KEY")
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri=BACKEND_URL+"/callback",
)


def sendMail(recepient, subject, body):
    try:
        smtp_server = "smtp.gmail.com"
        port = 587  # For starttls
        smtp_server = "smtp.gmail.com"
        sender_email = "eventer2023@gmail.com"
        password = GMAIL_PASSWORD
        receiver_email = recepient
        message = f"""\
        Subject: {subject}

        {body}"""

        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_server, port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message)

        return 200
    except Exception as e:
        print(e)
        return 500
# wrapper


def login_required(function):
    def wrapper(*args, **kwargs):
        encoded_jwt = request.headers.get("Authorization").split("Bearer ")[1]
        if encoded_jwt == None:
            return abort(401)
        else:
            return function()
    return wrapper


def Generate_JWT(payload):
    encoded_jwt = jwt.encode(payload, app.secret_key, algorithm=algorithm)
    return encoded_jwt


def getDeSoJWT(seedHex):
    # returns JWT token of user that helps in public key validation in backend
    private_key = bytes(seedHex, "utf-8")
    private_key = binascii.unhexlify(private_key)
    key = SigningKey.from_string(private_key, curve=SECP256k1)
    key = key.to_pem()
    encoded_jwt = jwt.encode({}, key, algorithm="ES256")
    return encoded_jwt


@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    request_session = requests.session()
    token_request = google.auth.transport.requests.Request(
        session=request_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    session["google_id"] = id_info.get("sub")

    # removing the specific audience, as it is throwing error
    del id_info['aud']
    jwt_token = Generate_JWT(id_info)
    # insert_into_db(
    #     id_info.get('name'),
    #     id_info.get('email'),
    #     id_info.get('picture')
    # )
    return redirect(f"{FRONTEND_URL}?jwt={jwt_token}")
    """ return Response(
        response=json.dumps({'JWT':jwt_token}),
        status=200,
        mimetype='application/json'
    ) """


@app.route("/auth/google")
def login():
    authorization_url, state = flow.authorization_url()
    # Store the state so the callback can verify the auth server response.
    session["state"] = state
    return Response(
        response=json.dumps({'auth_url': authorization_url}),
        status=200,
        mimetype='application/json'
    )


@app.route("/logout")
def logout():
    # clear the local storage from frontend
    session.clear()
    return Response(
        response=json.dumps({"message": "Logged out"}),
        status=202,
        mimetype='application/json'
    )


@app.route("/jwt-verify")
@login_required
def home_page_user():
    encoded_jwt = request.headers.get("Authorization").split("Bearer ")[1]
    try:
        decoded_jwt = jwt.decode(
            encoded_jwt, app.secret_key, algorithms=[algorithm, ])
        print(decoded_jwt)
    except Exception as e:
        return Response(
            response=json.dumps(
                {"message": "Decoding JWT Failed", "exception": e.args}),
            status=500,
            mimetype='application/json'
        )
    return Response(
        response=json.dumps(decoded_jwt),
        status=200,
        mimetype='application/json'
    )


@app.route("/self-info", methods=["POST"])
def selfInfo():
    try:
        encoded_jwt = request.headers.get("Authorization").split("Bearer ")[1]
        try:
            decoded_jwt = jwt.decode(
                encoded_jwt, app.secret_key, algorithms=[algorithm, ])
        except Exception as e:
            return Response(
                response=json.dumps(
                    {"message": "Decoding JWT Failed", "exception": e.args}),
                status=500,
                mimetype='application/json'
            )
        email = decoded_jwt["email"]
        query = f'''SELECT * FROM EventerUsers WHERE email = '{email}' '''
        cur = mysql.connection.cursor()
        cur.execute(query)
        response = cur.fetchall()
        if len(response) == 0:
            return Response(
                response=json.dumps(
                    {"message": "User doesn't exist", "user": None}),
                status=200,
                mimetype='application/json'
            )
        else:
            finalVal = {
                "serial": response[0][1],
                "username": response[0][5],
                "description": response[0][3],
                "profilePhoto": response[0][2],
                "tags": response[0][4],
            }
            return Response(
                response=json.dumps({
                    "message": "User found",
                    "user": finalVal
                }),
                status=200,
                mimetype='application/json'
            )
    except Exception as e:
        return Response(
            response=json.dumps(
                {"message": "Error getting user", "exception": e.args, "user": None}),
            status=500,
            mimetype='application/json'
        )


@app.route("/create-user", methods=["POST"])
def create_user():
    try:
        encoded_jwt = request.headers.get("Authorization").split("Bearer ")[1]
        try:
            decoded_jwt = jwt.decode(
                encoded_jwt, app.secret_key, algorithms=[algorithm, ])
        except Exception as e:
            return Response(
                response=json.dumps(
                    {"message": "Decoding JWT Failed", "exception": e.args, "userCreated": False}),
                status=500,
                mimetype='application/json'
            )

        data = request.get_json()
        username = data["username"]
        description = data["profileDescription"]
        profilePhoto = data["profilePhoto"]
        tags = data["tags"]
        profilePhoto = profilePhoto.split("/")[3]
        email = decoded_jwt["email"]
        checkQuery = f'''SELECT * FROM EventerUsers WHERE username = '{username}' '''
        cur = mysql.connection.cursor()
        cur.execute(checkQuery)
        result = cur.fetchall()
        if len(result) != 0:
            return Response(
                response=json.dumps(
                    {"message": "Username is taken", "userCreated": False}),
                status=200,
                mimetype='application/json'
            )

        query = f'''INSERT INTO EventerUsers (username, email, profileDescription, profilePhoto, tags) VALUES ('{username}', '{email}', '{description}', '{profilePhoto}', '{tags}')'''
        cur = mysql.connection.cursor()
        cur.execute(query)
        mysql.connection.commit()
        result = cur.fetchall()
        return Response(
            response=json.dumps({"message": "User created"}),
            status=200,
            mimetype='application/json'
        )

    except Exception as e:
        return Response(
            response=json.dumps(
                {"message": "Error creating user", "exception": e.args}),
            status=500,
            mimetype='application/json'
        )


@app.route("/upload-image-to-deso", methods=["POST"])
def upload_image_to_deso():
    try:
        if 'file' not in request.files:
            return Response(
                response=json.dumps({"message": "No file part"}),
                status=500,
                mimetype='application/json'
            )
        file = request.files['file']
        if file.filename == '':
            return Response(
                response=json.dumps({"message": "No selected file"}),
                status=500,
                mimetype='application/json'
            )

        file.save('uploads/' + file.filename)
        file_path = 'uploads/' + file.filename

        tempFile = open(file_path, "rb")
        imageFileList = [
            ('file', ('screenshot.jpg', tempFile, 'image/png'))]
        jwt = getDeSoJWT(EVENTER_SEED_HEX)
        endpointURL = "https://node.deso.org/api/v0/upload-image"
        payload = {
            "UserPublicKeyBase58Check": EVENTER_PUBLIC_KEY,
            "JWT": jwt,
        }

        response = requests.post(
            endpointURL, data=payload, files=imageFileList)

        # close the file
        file.close()
        tempFile.close()

        # delete the file saved in uploads folder
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            print("File not found.")
        return response.json()

    except Exception as e:
        return Response(
            response=json.dumps(
                {"message": "Error uploading Image", "exception": e.args}),
            status=500,
            mimetype='application/json'
        )


@app.route("/create-ad", methods=["POST"])
def create_post():
    try:
        encoded_jwt = request.headers.get("Authorization").split("Bearer ")[1]
        try:
            decoded_jwt = jwt.decode(
                encoded_jwt, app.secret_key, algorithms=[algorithm, ])
        except Exception as e:
            return Response(
                response=json.dumps(
                    {"message": "Decoding JWT Failed", "exception": e.args}),
                status=500,
                mimetype='application/json'
            )
        email = decoded_jwt["email"]
        query = f'''SELECT * FROM EventerUsers WHERE email = '{email}' '''
        cur = mysql.connection.cursor()
        cur.execute(query)
        response = cur.fetchall()
        finalVal = {}
        if len(response) == 0:
            return Response(
                response=json.dumps(
                    {"message": "User doesn't exist", "user": None}),
                status=200,
                mimetype='application/json'
            )
        else:
            finalVal = {
                "serial": str(response[0][1]),
                "username": str(response[0][5]),
                "description": str(response[0][3]),
                "profilePhoto": str(response[0][2]),
                "tags": str(response[0][4]),
            }
        data = request.get_json()
        shortDescription = data["shortDescription"]
        longDescription = data["longDescription"]
        isWork = data["isWork"]
        imageList = data["imageList"]
        desoSocial = deso.Social(EVENTER_PUBLIC_KEY, EVENTER_SEED_HEX)
        count = 0
        while True:
            count += 1
            response = desoSocial.submitPost(
                body=f'shortDescription: {shortDescription}\nlongDescription: {longDescription}', postHashHexToModify="", postExtraData=finalVal, imageURLs=imageList)

            if response.status_code == 200:
                resJson = response.json()

                createdPostHashHex = resJson["PostEntryResponse"]["PostHashHex"]
                isWorkVal = 1 if isWork else 0

                query = f'''INSERT into EventerPosts (postHashHex, emailID, isWork) VALUES ('{createdPostHashHex}', '{email}', {isWorkVal})'''
                cur = mysql.connection.cursor()
                cur.execute(query)
                mysql.connection.commit()

                return Response(
                    response=json.dumps(
                        {"message": "success", "data": resJson}),
                    status=200,
                    mimetype='application/json'
                )
            if count == 3:
                return Response(
                    response=json.dumps({"message": "Failed to create post"}),
                    status=500,
                    mimetype='application/json'
                )
    except Exception as e:
        return Response(
            response=json.dumps(
                {"message": "Error creating post", "exception": e.args}),
            status=500,
            mimetype='application/json'
        )


@app.route("/contact-vendor", methods=["POST"])
def contactVendor():
    try:

        encoded_jwt = request.headers.get("Authorization").split("Bearer ")[1]
        try:
            decoded_jwt = jwt.decode(
                encoded_jwt, app.secret_key, algorithms=[algorithm, ])
        except Exception as e:
            return Response(
                response=json.dumps(
                    {"message": "Decoding JWT Failed", "exception": e.args}),
                status=500,
                mimetype='application/json'
            )

        selfMail = decoded_jwt["email"]
        data = request.get_json()
        serial = int(data["serial"])
        # get email from db where serial = serial
        query = f'''SELECT email FROM EventerUsers WHERE counter = {serial}'''
        cur = mysql.connection.cursor()
        cur.execute(query)
        response = cur.fetchall()
        email = response[0][0]
        emailRes = sendMail(
            email, "New Enquiry", f"You have a new enquiry. Please check your Advertisement on Eventer!\nTheir Email: {selfMail}\n\nRegards,\nAditya Chaudhary\nEventer Team")
        if(emailRes == 200):
            return Response(
                response=json.dumps({"message": "success"}),
                status=200,
                mimetype='application/json'
            )
           
        else:
            return Response(
                response=json.dumps({"message": "Error contacting vendor"}),
                status=500,
                mimetype='application/json'
            )
    except Exception as e:
        return Response(
            response=json.dumps(
                {"message": "Error contacting vendor", "exception": e.args}),
            status=500,
            mimetype='application/json'
        )


if __name__ == "__main__":
    app.run(debug=True)
