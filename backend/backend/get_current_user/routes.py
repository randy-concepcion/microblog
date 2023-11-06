from . import get_current_user_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import get_user
from flask import jsonify
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)


@get_current_user_blueprint.route("/api/get_current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    uid = get_jwt_identity()

    return jsonify(
        get_user(uid),
        200,
        JSON_MIMETYPE,
    )
