from flask import (
    jsonify,
    request,
)
from . import add_post_blueprint
from backend.utils import add_post as utils_add_post


@add_post_blueprint.route("/api/add_post", methods=["POST"])
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
