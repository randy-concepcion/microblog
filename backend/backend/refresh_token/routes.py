from . import refresh_token_blueprint
from backend.constants import JSON_MIMETYPE
from flask import jsonify

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
)


@refresh_token_blueprint.route("/api/refresh_token", methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)

    return (jsonify({"token": token}), 200, JSON_MIMETYPE)
