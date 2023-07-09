from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///twitter.db"


# Database
db = SQLAlchemy(app)


class Users(db.Model):
    # primary_key makes it so that this value is unique and can be used to identify this record
    id = db.Column("student_id", db.Integer, primary_key=True)
    username = db.Column(db.String(24))
    email = db.Column(db.String(64))
    pwd = db.Column(db.String(64))

    def __init__(self, username, email, pwd):
        self.username = username
        self.email = email
        self.pwd = pwd


@app.route("/")
def index():
    return "Hello, world!"


if __name__ == "__main__":
    app.run(
        debug=True
    )  # debug=True restarts the server everytime we make a change in our code
