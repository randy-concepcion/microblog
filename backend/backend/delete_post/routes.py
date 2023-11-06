from . import delete_post_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import delete_post as utils_delete_post
from flask import jsonify
from flask_jwt_extended import jwt_required


@delete_post_blueprint.route("/api/delete_post/<post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    try:
        utils_delete_post(post_id)

        return (jsonify({"success": "true"}), 200, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, JSON_MIMETYPE)
