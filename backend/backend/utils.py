from backend import (
    db,
    jwt,
)
from backend.models import (
    InvalidToken,
    Post,
    User,
)


# ----- Post utility functions ----- #
def add_post(title: str, content: str, uid: str) -> bool:
    if title and content and uid:
        try:
            user = list(filter(lambda i: i.id == uid, User.query.all()))[0]
            post = Post(title=title, content=content, user=user)
            db.session.add(post)
            db.session.commit()

            return True

        except Exception as err:
            print(err)
            raise

    return False


def change_password(old_pwd: str, new_pwd: str, uid: str) -> bool:
    if old_pwd and new_pwd and uid:
        try:
            user = db.session.get(User, uid)

            if user.pwd != old_pwd:
                return False

            user.pwd = new_pwd
            db.session.add(user)
            db.session.commit()

            return True

        except Exception as err:
            print(err)
            raise

    return False


def delete_account(uid: str) -> bool:
    try:
        user = db.session.get(User, uid)
        posts = Post.query.all()

        for post in posts:
            if post.user.username == user.username:
                delete_post(post.id)

        remove_user(user.id)

        return True

    except Exception as err:
        print(err)
        raise


def delete_post(post_id: str) -> bool:
    if post_id:
        try:
            post = db.session.get(Post, post_id)
            db.session.delete(post)
            db.session.commit()

            return True

        except Exception as err:
            print(err)
            raise

    return False


def get_posts() -> list[dict]:
    posts = Post.query.all()

    return [
        {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "user": get_user(post.uid),
        }
        for post in posts
    ]


def get_user_posts(uid: int) -> list[dict]:
    posts = Post.query.all()

    return [
        {
            "id": post.id,
            "uid": post.uid,
            "title": post.title,
            "content": post.content,
        }
        for post in filter(lambda i: i.uid == uid, posts)
    ]


# ----- User utility functions ------ #
def get_user(uid: int) -> dict:
    users = User.query.all()
    user = list(filter(lambda x: x.id == uid, users))[0]

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "password": user.pwd,
    }


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


# ----- JWT Token utility functions ----- #
@jwt.token_in_blocklist_loader
def check_if_blocklisted_token(jwt_header, decrypted: dict):
    jti = decrypted["jti"]
    return InvalidToken.is_invalid(jti)
