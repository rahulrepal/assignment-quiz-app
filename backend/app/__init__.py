from flask import Flask
from .extension import api, jwt, cors
from .db.mongo import establish_db_connection
from .config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    establish_db_connection()

    jwt.init_app(app)

    cors.init_app(
        app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}}
    )

    api.init_app(app)
    return app
