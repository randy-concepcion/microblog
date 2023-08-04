from flask import (
    Flask,
    request,
    jsonify,
)
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///twitter.db"


# Database
db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column("student_id", db.Integer, primary_key=True)
    username = db.Column(db.String(24))
    email = db.Column(db.String(64))
    pwd = db.Column(db.String(64))

    def __init__(self, username, email, pwd):
        self.username = username
        self.email = email
        self.pwd = pwd


@app.route("/api/users", methods=["GET", "POST", "DELETE"])
def users():
    method = request.method

    if method.lower() == "get":
        users = Users.query.all()

        # Get all values from database
        return jsonify(
            [
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "password": user.pwd,
                }
                for user in users
            ]
        )

    elif method.lower() == "post":
        try:
            username = request.json["username"]
            email = request.json["email"]
            pwd = request.json["pwd"]

            if username and pwd and email:
                try:
                    user = Users(username, email, pwd)
                    db.session.add(user)
                    db.session.commit()

                    return jsonify({"success": True})

                except Exception as e:
                    return {"error": e}

        except Exception:
            jsonify({"error": "Invalid form"})

    elif method.lower() == "delete":
        try:
            uid = request.json["id"]

            if uid:
                try:
                    user = Users.query.get(uid)
                    db.session.delete(user)
                    db.session.commit()

                    return jsonify({"success": True})

                except Exception as e:
                    return jsonify({"error": e})

            else:
                return jsonify({"error": "Invalid form"})

        except Exception:
            return jsonify({"error": "m"})


if __name__ == "__main__":
    app.run(
        debug=True
    )  # debug=True restarts the server everytime we make a change in our code
