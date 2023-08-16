import re
from flask import (
    jsonify,
    request,
)
from . import register_blueprint
from backend.utils import (
    add_user,
    get_users,
)


@register_blueprint.route("/api/register", methods=["POST"])
def register():
    json_mimetype = {"Content-Type": "application/json"}

    try:
        email = request.json["email"].lower()
        password = request.json["pwd"]
        username = request.json["username"]

        # Check to see if user already exists
        users = get_users()

        if len(list(filter(lambda x: x["email"] == email, users))) == 1:
            return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

        # Email validation check
        if not re.match(r"[\w\._]{5,}@\w{3,}.\w{2,4}", email):
            return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

        add_user(username, email, password)

        return (jsonify({"success": True}), 200, json_mimetype)

    except Exception as err:
        return (jsonify({"error": repr(err)}), 400, json_mimetype)
