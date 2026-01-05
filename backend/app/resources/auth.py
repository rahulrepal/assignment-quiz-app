from flask import request
from flask_restful import Resource
from pydantic import ValidationError
from flask_jwt_extended import create_access_token
from app.schema.auth import LoginSchema
from app.services.user import get_user
from app.utils import verify_password


class LoginResource(Resource):
    def post(self):
        try:
            payload = LoginSchema(**request.get_json())
        except ValidationError as error:
            return error.errors(), 400

        user = get_user(filters={"username": payload.username})

        if not user:
            return {"error": "Invalid credentials"}, 401

        if not verify_password(payload.password, user["password"]):
            return {"error": "Invalid credentials"}, 401

        access_token = create_access_token(
            identity=str(user["_id"]),
            additional_claims={
                "username": user["username"],
                "role": user["role"],
            },
        )

        return {"access_token": access_token}, 200
