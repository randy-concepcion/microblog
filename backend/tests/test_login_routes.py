import pytest


class TestLoginEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/login"
        self.mocker = mocker
        self.test_client = test_client

    def test_bad_data_raises_exception(self):
        post_json = {"unexpected": "data"}

        mock_get_users = self.mocker.patch("backend.utils.get_users")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_get_users.assert_not_called()

    def test_null_user_data_returns_invalid_form_response(self):
        post_json = {"email": "test@test.com", "pwd": None}

        mock_get_users = self.mocker.patch("backend.utils.get_users")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_get_users.assert_not_called()
