import pytest
from flask_jwt_extended import create_access_token


class TestTokenExpirationEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/token_expiration"
        self.test_client = test_client

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
