from . import add_post_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import add_post as utils_add_post
from flask import (
    jsonify,
    request,
)
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)


@add_post_blueprint.route("/api/add_post", methods=["POST"])
@jwt_required()
def add_post():
    try:
        title = request.json["title"]
        content = request.json["content"]
        uid = get_jwt_identity()

        utils_add_post(title, content, uid)

        return (jsonify({"success": "true"}), 200, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, JSON_MIMETYPE)
