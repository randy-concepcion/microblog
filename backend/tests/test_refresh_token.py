import pytest
from flask_jwt_extended import create_refresh_token


class TestRefreshTokenEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/refresh_token"
        self.test_client = test_client

    def test_returns_success(self):
        access_token = create_refresh_token("jwt_token")
        headers = {"Authorization": f"Bearer {access_token}"}
        post_json = {"token": access_token}

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            headers=headers,
            json=post_json,
        )

        assert response.status_code == 200
        assert b"token" in response.data
