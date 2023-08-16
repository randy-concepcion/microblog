import pytest


class TestLoginEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/login"
        self.mocker = mocker
        self.test_client = test_client

    def test_bad_data_raises_exception(self):
        post_json = {"unexpected": "data"}

        mock_get_users = self.mocker.patch("backend.login.routes.get_users")

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

        mock_get_users = self.mocker.patch("backend.login.routes.get_users")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_get_users.assert_not_called()

    def test_valid_user_data_no_match_returns_false(self):
        post_json = {"email": "test@test.com", "pwd": "12345"}
        users_list = [
            {"email": "foo@foo.com", "pwd": "12345"},
            {"email": "bar@bar.com", "pwd": "67890"},
        ]

        mock_get_users = self.mocker.patch(
            "backend.login.routes.get_users", return_value=users_list
        )

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 200
        assert response.json is False
        mock_get_users.assert_called_once()

    def test_valid_user_data_with_match_returns_true(self):
        post_json = {"email": "test@test.com", "pwd": "12345"}
        users_list = [
            {"email": post_json["email"], "pwd": post_json["pwd"]},
            {"email": "bar@bar.com", "pwd": "67890"},
        ]

        mock_get_users = self.mocker.patch(
            "backend.login.routes.get_users", return_value=users_list
        )

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 200
        assert response.json is True
        mock_get_users.assert_called_once()
