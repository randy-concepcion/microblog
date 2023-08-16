from email_validator import validate_email
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

        # Email validation check
        email_info = validate_email(email, check_deliverability=False)
        email = email_info.normalized

        # Check to see if user already exists
        users = get_users()

        if len(list(filter(lambda x: x["email"] == email, users))) == 1:
            return (jsonify({"error": "error registering user"}), 400, json_mimetype)

        # User doesn't already exist and has a valid email address
        add_user(username, email, password)

        return (jsonify({"success": True}), 200, json_mimetype)

    except Exception as err:
        return (jsonify({"error": repr(err)}), 400, json_mimetype)
