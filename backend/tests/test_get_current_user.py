import pytest
from flask_jwt_extended import create_access_token


class TestGetCurrentUserEndpointGet:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/get_current_user"
        self.mocker = mocker
        self.test_client = test_client

    def test_call_to_get_current_user_endpoint_returns_success(self):
        fake_user_id = "1"
        access_token = create_access_token(fake_user_id)
        headers = {"Authorization": f"Bearer {access_token}"}
        mock_get_user_response = {
            "id": 1,
            "username": "bobloblaw",
            "email": "bob.loblaw@lawblog.com",
            "password": "12345",
        }

        mock_get_user = self.mocker.patch(
            "backend.get_current_user.routes.get_user",
            return_value=mock_get_user_response,
        )

        response = self.test_client.get(
            self.endpoint,
            headers=headers,
        )

        mock_get_user.assert_called_once_with(fake_user_id)
        assert response.status_code == 200
