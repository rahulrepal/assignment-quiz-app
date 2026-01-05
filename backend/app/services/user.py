from app.db.mongo import db


def get_user(filters):
    return db.users.find_one(filters)
