import pytest  # noqa F401
from backend import create_app, db
from backend.models import (
    Post,
    User,
)


@pytest.fixture(scope="module")
def test_client():
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    flask_app.config["WTF_CSRF_METHODS"] = []

    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client


@pytest.fixture(scope="function")
def init_database(test_client):
    # Recreate db session from scratch when instantiated
    db.session.close()
    db.drop_all()
    db.create_all()

    default_user = User(
        username="bobloblaw", email="bob.loblaw@lawblog.com", pwd="12345"
    )

    default_post = Post(
        uid="1", title="Bob's Big Post", content="Bob's law blog post is big"
    )

    db.session.add(default_user)
    db.session.add(default_post)

    db.session.commit()
