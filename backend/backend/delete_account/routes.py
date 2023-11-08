from . import delete_account_blueprint
from backend.constants import JSON_MIMETYPE
from backend.utils import delete_account as utils_delete_account
from flask import jsonify

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)


@delete_account_blueprint.route("/api/delete_account", methods=["POST"])
@jwt_required()
def delete_account():
    try:
        uid = get_jwt_identity()

        utils_delete_account(uid)

        return (jsonify({"success": True}), 200, JSON_MIMETYPE)

    except Exception as err:
        return (jsonify({"error": str(err)}), 400, JSON_MIMETYPE)
