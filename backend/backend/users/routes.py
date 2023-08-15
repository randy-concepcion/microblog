from flask import (
    jsonify,
    request,
)
from . import users_blueprint
from .utils import (
    get_users,
    add_user,
    remove_user,
)


@users_blueprint.route("/api/users", methods=["GET", "POST", "DELETE"])
def users():
    json_mimetype = {"Content-Type": "application/json"}
    method = request.method

    if method.lower() == "get":
        result = get_users()
        return (jsonify(result), 200, json_mimetype)

    elif method.lower() == "post":
        try:
            username = request.json["username"]
            email = request.json["email"]
            pwd = request.json["pwd"]

            success = add_user(username, email, pwd)

            if success:
                return (jsonify({"success": True}), 200, json_mimetype)

            else:
                return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

        except Exception as err:
            return (jsonify({"error": repr(err)}), 400, json_mimetype)

    elif method.lower() == "delete":
        try:
            uid = request.json["id"]

            success = remove_user(uid)

            if success:
                return jsonify({"success": True})

            else:
                return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

        except Exception as err:
            return (jsonify({"error": repr(err)}), 400, json_mimetype)
