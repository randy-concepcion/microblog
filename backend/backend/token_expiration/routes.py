from . import token_expiration_blueprint
from backend.constants import JSON_MIMETYPE
from flask import jsonify

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)


@token_expiration_blueprint.route("/api/token_expiration", methods=["POST"])
@jwt_required()
def token_expiration():
    print(get_jwt_identity())

    return (jsonify({"success": True}), 200, JSON_MIMETYPE)
