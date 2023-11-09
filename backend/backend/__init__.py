import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from sqlalchemy import create_engine


cors = CORS()
csrf = CSRFProtect()
db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///twitter.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["SECRET_KEY"] = os.getenv("CSRF_SECRET_KEY")
    create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    csrf.init_app(app)
    register_blueprints(app)

    return app


def register_blueprints(app):
    from backend.add_post import add_post_blueprint
    from backend.change_password import change_password_blueprint
    from backend.delete_account import delete_account_blueprint
    from backend.delete_post import delete_post_blueprint
    from backend.get_current_user import get_current_user_blueprint
    from backend.get_posts import get_posts_blueprint
    from backend.login import login_blueprint
    from backend.logout_access import logout_access_blueprint
    from backend.logout_refresh import logout_refresh_blueprint
    from backend.refresh_token import refresh_token_blueprint
    from backend.register import register_blueprint
    from backend.token_expiration import token_expiration_blueprint
    from backend.users import users_blueprint

    # TODO: Add CSRF protection for routes
    # For now, we will exempt the routes for CSRF protection
    # and implement it later
    csrf.exempt(add_post_blueprint)
    csrf.exempt(change_password_blueprint)
    csrf.exempt(delete_account_blueprint)
    csrf.exempt(delete_post_blueprint)
    csrf.exempt(get_current_user_blueprint)
    csrf.exempt(get_posts_blueprint)
    csrf.exempt(login_blueprint)
    csrf.exempt(logout_access_blueprint)
    csrf.exempt(logout_refresh_blueprint)
    csrf.exempt(refresh_token_blueprint)
    csrf.exempt(register_blueprint)
    csrf.exempt(token_expiration_blueprint)
    csrf.exempt(users_blueprint)

    app.register_blueprint(add_post_blueprint)
    app.register_blueprint(change_password_blueprint)
    app.register_blueprint(delete_account_blueprint)
    app.register_blueprint(delete_post_blueprint)
    app.register_blueprint(get_current_user_blueprint)
    app.register_blueprint(get_posts_blueprint)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(logout_access_blueprint)
    app.register_blueprint(logout_refresh_blueprint)
    app.register_blueprint(refresh_token_blueprint)
    app.register_blueprint(register_blueprint)
    app.register_blueprint(token_expiration_blueprint)
    app.register_blueprint(users_blueprint)
