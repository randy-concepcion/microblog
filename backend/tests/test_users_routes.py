import pytest
from sqlalchemy.exc import SQLAlchemyError


class TestUsersEndpointGet:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/users"
        self.mocker = mocker
        self.test_client = test_client

    def test_success(self):
        user_result = [{"foo": "bar"}]
        mock_get_users = self.mocker.patch(
            "backend.users.routes.get_users", return_value=user_result
        )

        response = self.test_client.get(self.endpoint)

        assert response.status_code == 200
        mock_get_users.assert_called_once()


class TestUsersEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/users"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

    def test_bad_data_exception(self):
        post_json = {"unexpected": "data"}

        mock_add_user = self.mocker.patch("backend.users.routes.add_user")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_add_user.assert_not_called()

    def test_db_session_add_user_raises_exception(self):
        post_json = {
            "username": "bobloblaw",
            "email": "bob.loblaw@lawblog.com",
            "pwd": "12345",
        }

        mock_add_user = self.mocker.patch("backend.users.routes.add_user")
        mock_add_user.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_add_user.assert_called_once_with(
            post_json["username"], post_json["email"], post_json["pwd"]
        )

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


class TestUsersEndpointDelete:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, test_client, init_database):
        self.endpoint = "/api/users"
        self.test_client = test_client
        self.init_db = init_database

    def test_bad_data_exception(self):
        post_json = {"unexpected": "data"}

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data

    def test_no_user_id_exists_returns_invalid_form_response(self):
        post_json = {"id": None}

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"Invalid form" in response.data

    def test_valid_user_id_returns_success(self):
        post_json = {"id": "1"}

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 200
        assert b"success" in response.data


class TestUsersEndpointUnhandledMethods:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, test_client, init_database):
        self.endpoint = "/api/users"
        self.test_client = test_client

    def test_returns_internal_server_error(self):
        # Since the server code doesn't handle
        # the PUT method, we will test how we handle it
        response = self.test_client.put(
            self.endpoint, content_type="application/json", json={"foo": "bar"}
        )

        assert response.status_code == 405
        assert b"Method Not Allowed" in response.data
