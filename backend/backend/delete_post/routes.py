from . import delete_post_blueprint
from backend.utils import delete_post as utils_delete_post
from flask import (
    jsonify,
    request,
)
from flask_jwt_extended import jwt_required


@delete_post_blueprint.route("/api/delete_post", methods=["DELETE"])
@jwt_required()
def delete_post():
    json_mimetype = {"Content-Type": "application/json"}

    try:
        post_id = request.json["post_id"]
        utils_delete_post(post_id)

        return (jsonify({"success": "true"}), 200, json_mimetype)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, json_mimetype)
