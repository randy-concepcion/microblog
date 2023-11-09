import pytest
from flask_jwt_extended import create_access_token


class TestDeleteAccountEndpoint:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/delete_account"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

        jwt_token = create_access_token(1)
        self.header = {"Authorization": f"Bearer {jwt_token}"}

    def test_no_jwt_token_raises_auth_error(self):
        mock_delete_account = self.mocker.patch(
            "backend.delete_account.routes.utils_delete_account"
        )

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
        )

        assert response.status_code == 401
        assert b"Missing Authorization Header" in response.data
        mock_delete_account.assert_not_called()

    def test_delete_account_raises_exception(self):
        mock_delete_account = self.mocker.patch(
            "backend.delete_account.routes.utils_delete_account"
        )
        mock_delete_account.side_effect = Exception

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            headers=self.header,
        )

        assert response.status_code == 400
        assert b"error" in response.data

    def test_delete_account_returns_success(self):
        self.mocker.patch("backend.delete_account.routes.utils_delete_account")

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            headers=self.header,
        )

        assert response.status_code == 200
        assert b"success" in response.data
