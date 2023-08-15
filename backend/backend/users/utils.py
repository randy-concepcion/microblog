from backend import db
from ..models import Users


def get_users() -> list[dict]:
    users = Users.query.all()

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
            user = Users(username, email, pwd)
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
            user = db.session.get(Users, uid)
            db.session.delete(user)
            db.session.commit()

            return True

        except Exception as err:
            print(err)
            raise

    return False
