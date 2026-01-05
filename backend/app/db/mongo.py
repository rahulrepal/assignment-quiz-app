from pymongo import MongoClient
from app.config import Config

client = None
db = None


def establish_db_connection():
    global client, db

    client = MongoClient(Config.MONGO_URL)
    db = client.get_default_database()
