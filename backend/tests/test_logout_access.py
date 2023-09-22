import pytest
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import SQLAlchemyError


class TestLogoutRefreshEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/logout/access"
        self.mocker = mocker
        self.test_client = test_client

    def test_bad_data_raises_exception(self):
        mock_model = self.mocker.patch("backend.logout_access.routes.InvalidToken.save")
        mock_model.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")
        access_token = create_access_token("jwt_token")
        headers = {"Authorization": f"Bearer {access_token}"}

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            headers=headers,
        )

        assert response.status_code == 400
        assert b"error" in response.data

    def test_returns_success(self):
        access_token = create_access_token("jwt_token")
        headers = {"Authorization": f"Bearer {access_token}"}

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            headers=headers,
        )

        assert response.status_code == 200
        assert b"success" in response.data
