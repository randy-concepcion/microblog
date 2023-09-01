from backend import db
from backend.models import User


def get_users() -> list[dict]:
    users = User.query.all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "password": user.pwd,
        }
        for user in users
    ]


def add_user(username: str, email: str, pwd: str) -> bool:
    if username and pwd and email:
        try:
            user = User(username, email, pwd)
            db.session.add(user)
            db.session.commit()

            return True

        except Exception as err:
            print(err)
            raise

    return False


def remove_user(uid: str) -> bool:
    if uid:
        try:
            user = db.session.get(User, uid)
            db.session.delete(user)
            db.session.commit()

            return True

        except Exception as err:
            print(err)
            raise

    return False
