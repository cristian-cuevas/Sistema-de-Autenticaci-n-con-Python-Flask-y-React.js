"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    search = User.query.filter_by(email=email).one_or_none()
    
    if search != None and search.password==password:
        access_token = create_access_token(identity=email)
        return jsonify({"access_token":access_token, "user":search.serialize()}), 200
    else:
        return 'Las credenciales no coinciden', 404 

@api.route("/registro", methods=["POST"])
def registro_users():
    body = request.json
    if "email" not in body:
        return 'Debe indicar el correo electronico!', 400
    if "password" not in body:
        return 'Debe indicar la contraseña', 400
    if "is_active" not in body:
        return 'Debe seleccionar el checkbox', 400
    else:
       
        new_row = User.new_registro_user(body["email"], body["password"], body["is_active"])

        if new_row == None:
            return 'Un error ha ocurrido, upps!', 500
        else:
            return jsonify(new_row.serialize()), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200