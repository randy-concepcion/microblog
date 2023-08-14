import pytest
from sqlalchemy.exc import SQLAlchemyError


class TestUsersEndpointGet:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/users"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

    def test_success(self):
        response = self.test_client.get(self.endpoint)
        result_user = response.json[0]

        assert response.status_code == 200
        assert result_user["id"] == 1
        assert result_user["username"] == "bobloblaw"
        assert result_user["email"] == "bob.loblaw@lawblog.com"
        assert result_user["password"] == "12345"


class TestUsersEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/users"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

    def test_bad_data_exception(self):
        post_json = {"unexpected": "data"}

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data

    def test_db_session_add_user_returns_invalid_form_response(self):
        post_json = {
            "username": "bobloblaw",
            "email": "bob.loblaw@lawblog.com",
            "pwd": "12345",
        }

        mock_db = self.mocker.patch("backend.db.session.commit")
        mock_db.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data

    def test_null_values_returns_exception(self):
        post_json = {
            "username": "bobloblaw",
            "email": None,
            "pwd": None,
        }

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"Invalid form" in response.data

    def test_valid_user_data_returns_success(self):
        post_json = {
            "username": "bobloblaw",
            "email": "bob.loblaw@lawblog.com",
            "pwd": "12345",
        }

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 200
        assert b"success" in response.data
