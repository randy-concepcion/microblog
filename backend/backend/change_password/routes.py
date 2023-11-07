from . import change_password_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import change_password as utils_change_password
from flask import (
    jsonify,
    request,
)

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)


@change_password_blueprint.route("/api/change_password", methods=["POST"])
@jwt_required()
def change_password():
    try:
        uid = get_jwt_identity()
        old_pwd = request.json["password"]
        new_pwd = request.json["npassword"]

        result = utils_change_password(old_pwd, new_pwd, uid)

        if not result:
            return (jsonify({"error": "error changing password"}), 400, JSON_MIMETYPE)

        return (jsonify({"success": True}), 200, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, JSON_MIMETYPE)
