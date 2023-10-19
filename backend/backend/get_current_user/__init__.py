from flask import Blueprint


get_current_user_blueprint = Blueprint("get_current_user", __name__)

# We want to ignore "imported but unused" and "module level import not at top of file" since these are necessary for accessing routes from the blueprint
from . import routes  # noqa: F401,E402
