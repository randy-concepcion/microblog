from flask import (
    jsonify,
    request,
)
from . import users_blueprint
from backend.utils import (
    get_users,
    add_user,
    remove_user,
)


@users_blueprint.route("/api/users", methods=["GET"])
def users_get():
    json_mimetype = {"Content-Type": "application/json"}

    result = get_users()
    return (jsonify(result), 200, json_mimetype)


@users_blueprint.route("/api/users", methods=["POST"])
def users_post():
    json_mimetype = {"Content-Type": "application/json"}

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


@users_blueprint.route("/api/users", methods=["DELETE"])
def users_delete():
    json_mimetype = {"Content-Type": "application/json"}

    try:
        uid = request.json["id"]

        success = remove_user(uid)

        if success:
            return jsonify({"success": True})

        else:
            return (jsonify({"error": "Invalid form"}), 400, json_mimetype)

    except Exception as err:
        return (jsonify({"error": repr(err)}), 400, json_mimetype)
