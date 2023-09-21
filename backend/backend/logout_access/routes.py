from . import logout_access_blueprint
from ..models import InvalidToken
from flask import jsonify

from flask_jwt_extended import (
    get_raw_jwt,
    jwt_required,
)


@logout_access_blueprint.route("/api/logout/access", methods=["POST"])
@jwt_required
def logout_access():
    json_mimetype = {"Content-Type": "application/json"}
    jti = get_raw_jwt()["jti"]

    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()

        return (jsonify({"success": True}), 200, json_mimetype)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, json_mimetype)
