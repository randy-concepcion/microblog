import secrets
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
    app.config["SECRET_KEY"] = secrets.token_urlsafe(16)
    create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

    db.init_app(app)
    cors.init_app(app)
    csrf.init_app(app)
    register_blueprints(app)

    return app


def register_blueprints(app):
    from backend.login import login_blueprint
    from backend.register import register_blueprint
    from backend.users import users_blueprint

    app.register_blueprint(login_blueprint)
    app.register_blueprint(register_blueprint)
    app.register_blueprint(users_blueprint)
