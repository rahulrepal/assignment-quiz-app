from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager

api = Api()
jwt = JWTManager()
cors = CORS()
