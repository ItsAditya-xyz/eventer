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

GMAIL_PASSWORD = config("GMAIL_PASSWORD")

mysql = MySQL(app)
# bypass http
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app.secret_key = config("GOOGLE_CLIENT_SECRET")
GOOGLE_CLIENT_ID = config("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent, "client-secret.json")  # get this file from google console
algorithm = config("ALGORITHM")
BACKEND_URL = config("BACKEND_URL")
FRONTEND_URL = config("FRONTEND_URL")


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

        import smtplib
        import ssl

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


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
