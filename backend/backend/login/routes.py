from . import login_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import get_users
from flask import (
    jsonify,
    request,
)
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)


@login_blueprint.route("/api/login", methods=["POST"])
def login():
    try:
        email = request.json["email"]
        password = request.json["pwd"]
        if email and password:
            user = list(
                filter(
                    lambda x: x["email"] == email and x["password"] == password,
                    get_users(),
                )
            )

            if len(user) == 1:
                jwt_token = create_access_token(identity=user[0]["id"])
                refresh_token = create_refresh_token(identity=user[0]["id"])
                return (
                    jsonify({"token": jwt_token, "refreshToken": refresh_token}),
                    200,
                    JSON_MIMETYPE,
                )

        return (jsonify({"error": "Invalid credentials"}), 200, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, JSON_MIMETYPE)
