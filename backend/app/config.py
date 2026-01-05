import os


ENV = os.getenv("ENVIRONMENT", "local")


class Config:
    ENVIRONMENT = ENV
    DEBUG = ENV == "local"
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ["JWT_ACCESS_TOKEN_EXPIRES"])
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
    MONGO_URL = os.environ["MONGO_URL"]
