import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from sqlalchemy import create_engine


cors = CORS()
csrf = CSRFProtect()
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///twitter.db"
    app.config["SECRET_KEY"] = os.getenv("CSRF_SECRET_KEY")
    create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

    db.init_app(app)
    cors.init_app(app)
    csrf.init_app(app)
    register_blueprints(app)

    return app


def register_blueprints(app):
    from backend.add_post import add_post_blueprint
    from backend.delete_post import delete_post_blueprint
    from backend.get_posts import get_posts_blueprint
    from backend.login import login_blueprint
    from backend.register import register_blueprint
    from backend.users import users_blueprint

    # TODO: Add CSRF protection for routes
    # For now, we will exempt the routes for CSRF protection
    # and implement it later
    csrf.exempt(add_post_blueprint)
    csrf.exempt(delete_post_blueprint)
    csrf.exempt(get_posts_blueprint)
    csrf.exempt(login_blueprint)
    csrf.exempt(register_blueprint)
    csrf.exempt(users_blueprint)

    app.register_blueprint(add_post_blueprint)
    app.register_blueprint(delete_post_blueprint)
    app.register_blueprint(get_posts_blueprint)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(register_blueprint)
    app.register_blueprint(users_blueprint)
