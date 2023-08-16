import pytest


class TestRegisterEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client):
        self.endpoint = "/api/register"
        self.mocker = mocker
        self.test_client = test_client

    def test_bad_data_raises_exception(self):
        post_json = {"unexpected": "data"}

        mock_add_users = self.mocker.patch("backend.register.routes.get_users")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_add_users.assert_not_called()

    def test_user_already_exists_returns_error(self):
        post_json = {"email": "foo@foo.com", "pwd": "12345", "username": "foofoo"}

        users_list = [
            {"email": "foo@foo.com"},
            {"email": "bar@bar.com"},
        ]

        self.mocker.patch("backend.register.routes.get_users", return_value=users_list)
        mock_add_user = self.mocker.patch("backend.register.routes.add_user")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_add_user.assert_not_called()

    def test_user_fail_email_validation_returns_error(self):
        post_json = {
            "email": "badformat_emailaddress.com",
            "pwd": "12345",
            "username": "badboi",
        }

        users_list = [
            {"email": "candy@candy.com"},
            {"email": "bar@bar.com"},
        ]

        self.mocker.patch("backend.register.routes.get_users", return_value=users_list)
        mock_add_user = self.mocker.patch("backend.register.routes.add_user")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_add_user.assert_not_called()

    def test_register_valid_user_returns_success(self):
        post_json = {"email": "foo@foo.com", "pwd": "12345", "username": "foofoo"}

        users_list = [
            {"email": "candy@candy.com"},
            {"email": "bar@bar.com"},
        ]

        self.mocker.patch("backend.register.routes.get_users", return_value=users_list)
        mock_add_user = self.mocker.patch("backend.register.routes.add_user")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 200
        assert b"success" in response.data
        mock_add_user.assert_called_once_with(
            post_json["username"], post_json["email"], post_json["pwd"]
        )
