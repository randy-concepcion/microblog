from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///twitter.db"
    create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
    db.init_app(app)

    register_blueprints(app)

    return app


def register_blueprints(app):
    from backend.users import users_blueprint

    app.register_blueprint(users_blueprint)
