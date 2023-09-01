from flask import (
    jsonify,
    request,
)
from . import login_blueprint
from backend.utils import get_users


@login_blueprint.route("/api/login", methods=["POST"])
def login():
    json_mimetype = {"Content-Type": "application/json"}

    try:
        email = request.json["email"]
        password = request.json["pwd"]
        if email and password:
            users = get_users()

            # Check if user exists
            return (
                jsonify(
                    len(
                        list(
                            filter(
                                lambda x: x["email"] == email and x["pwd"] == password,
                                users,
                            )
                        )
                    )
                    == 1
                ),
                200,
                json_mimetype,
            )
        else:
            return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, json_mimetype)
