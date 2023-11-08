import pytest
from flask_jwt_extended import create_access_token


class TestChangePasswordEndpoint:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/change_password"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

        jwt_token = create_access_token(1)
        self.header = {"Authorization": f"Bearer {jwt_token}"}

    def test_no_jwt_token_raises_auth_error(self):
        post_json = {
            "password": "some-old-password",
            "npassword": "some-new-password",
        }

        mock_change_password = self.mocker.patch(
            "backend.change_password.routes.utils_change_password", return_value=False
        )

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 401
        assert b"Missing Authorization Header" in response.data
        mock_change_password.assert_not_called()

    def test_bad_data_raises_exception(self):
        post_json = {"unexpected": "data"}

        mock_change_password = self.mocker.patch(
            "backend.change_password.routes.utils_change_password"
        )

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
            headers=self.header,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_change_password.assert_not_called()

    def test_incorrect_password_returns_error(self):
        post_json = {
            "password": "some-incorrect-password",
            "npassword": "some-new-password",
        }

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
            headers=self.header,
        )

        assert response.status_code == 400
        assert b"error" in response.data

    def test_valid_post_data_returns_true(self):
        post_json = {
            "password": "12345",
            "npassword": "some-new-password",
        }

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
            headers=self.header,
        )

        assert response.status_code == 200
        assert b"success" in response.data
