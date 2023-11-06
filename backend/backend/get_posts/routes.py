from . import get_posts_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import get_posts as utils_get_posts
from flask import jsonify


@get_posts_blueprint.route("/api/posts", methods=["GET"])
def get_posts():
    return jsonify(
        utils_get_posts(),
        200,
        JSON_MIMETYPE,
    )
