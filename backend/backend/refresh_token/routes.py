from . import refresh_token_blueprint
from flask import jsonify

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_refresh_token_required,
)


@refresh_token_blueprint.route("/api/refresh_token", methods=["POST"])
@jwt_refresh_token_required
def refresh_token():
    json_mimetype = {"Content-Type": "application/json"}
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)

    return (jsonify({"token": token}), 200, json_mimetype)
