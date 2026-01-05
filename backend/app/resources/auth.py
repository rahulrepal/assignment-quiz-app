from flask_restful import Resource


class LoginResource(Resource):
    def post(self):
        return {"access_token": "token"}, 200
