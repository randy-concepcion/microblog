from flask import jsonify
from . import get_posts_blueprint
from backend.utils import get_posts as utils_get_posts


@get_posts_blueprint.route("/api/posts", methods=["GET"])
def get_posts():
    json_mimetype = {"Content-Type": "application/json"}

    return jsonify(
        utils_get_posts(),
        200,
        json_mimetype,
    )
