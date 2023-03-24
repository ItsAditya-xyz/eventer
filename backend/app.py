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
import openai
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
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app.secret_key = config("GOOGLE_CLIENT_SECRET")
GOOGLE_CLIENT_ID = config("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent, "client-secret.json")  # get this file from google console
algorithm = config("ALGORITHM")
BACKEND_URL = config("BACKEND_URL")
FRONTEND_URL = config("FRONTEND_URL")

OPEN_AI_KEY = config("PAID_API_KEY")
openai.api_key = OPEN_AI_KEY

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri=BACKEND_URL+"/callback",
)


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
