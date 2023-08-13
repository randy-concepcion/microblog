import pytest  # noqa F401
from backend import create_app, db
from backend.models import Users


@pytest.fixture(scope="module")
def test_client():
    flask_app = create_app()

    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client


@pytest.fixture(scope="module")
def init_database(test_client):
    db.create_all()

    default_user = Users(
        username="bobloblaw", email="bob.loblaw@lawblog.com", pwd="12345"
    )

    db.session.add(default_user)

    db.session.commit()

    yield

    db.drop_all()
