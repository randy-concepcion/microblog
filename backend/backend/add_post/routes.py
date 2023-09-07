from . import add_post_blueprint
from backend.utils import add_post as utils_add_post
from flask import (
    jsonify,
    request,
)
from flask_jwt_extended import jwt_required


@add_post_blueprint.route("/api/add_post", methods=["POST"])
@jwt_required()
def add_post():
    json_mimetype = {"Content-Type": "application/json"}

    try:
        title = request.json["title"]
        content = request.json["content"]
        uid = request.json["uid"]

        utils_add_post(title, content, uid)

        return (jsonify({"success": "true"}), 200, json_mimetype)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, json_mimetype)
