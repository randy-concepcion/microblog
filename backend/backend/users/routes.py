from flask import (
    jsonify,
    request,
)
from . import users_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import (
    get_users,
    add_user,
    remove_user,
)


@users_blueprint.route("/api/users", methods=["GET"])
def users_get():
    result = get_users()
    return (jsonify(result), 200, JSON_MIMETYPE)


@users_blueprint.route("/api/users", methods=["POST"])
def users_post():
    try:
        username = request.json["username"]
        email = request.json["email"]
        pwd = request.json["pwd"]

        success = add_user(username, email, pwd)

        if success:
            return (jsonify({"success": True}), 200, JSON_MIMETYPE)

        else:
            return (jsonify({"error": "Invalid form"}), 400, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": repr(err)}), 400, JSON_MIMETYPE)


@users_blueprint.route("/api/users", methods=["DELETE"])
def users_delete():
    try:
        uid = request.json["id"]

        success = remove_user(uid)

        if success:
            return jsonify({"success": True})

        else:
            return (jsonify({"error": "Invalid form"}), 400, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": repr(err)}), 400, JSON_MIMETYPE)
