from backend import db
from flask import (
    jsonify,
    request,
)
from . import users_blueprint
from ..models import Users


@users_blueprint.route("/api/users", methods=["GET", "POST", "DELETE"])
def users():
    json_mimetype = {"Content-Type": "application/json"}
    method = request.method

    if method.lower() == "get":
        users = Users.query.all()

        # Get all values from database
        return (
            jsonify(
                [
                    {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "password": user.pwd,
                    }
                    for user in users
                ]
            ),
            200,
            json_mimetype,
        )

    elif method.lower() == "post":
        try:
            username = request.json["username"]
            email = request.json["email"]
            pwd = request.json["pwd"]

            if username and pwd and email:
                user = Users(username, email, pwd)
                db.session.add(user)
                db.session.commit()

                return (jsonify({"success": True}), 200, json_mimetype)

            else:
                return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

        except Exception as err:
            return (jsonify({"error": repr(err)}), 400, json_mimetype)

    elif method.lower() == "delete":
        try:
            uid = request.json["id"]

            if uid:
                user = db.session.get(Users, uid)
                db.session.delete(user)
                db.session.commit()

                return jsonify({"success": True})

            else:
                return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

        except Exception as err:
            return (jsonify({"error": repr(err)}), 400, json_mimetype)
