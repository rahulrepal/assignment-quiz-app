from werkzeug.security import check_password_hash


def verify_password(password: str, hashed_password: str) -> bool:
    return check_password_hash(hashed_password, password)
