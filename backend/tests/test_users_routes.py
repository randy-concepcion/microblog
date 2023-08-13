import pytest


class TestUsersEndpoint:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, test_client, init_database):
        self.endpoint = "/api/users"
        self.test_client = test_client
        self.init_db = init_database

    def test_get_method(self):
        response = self.test_client.get(self.endpoint)
        result_user = response.json[0]

        assert response.status_code == 200
        assert result_user["id"] == 1
        assert result_user["username"] == "bobloblaw"
        assert result_user["email"] == "bob.loblaw@lawblog.com"
        assert result_user["password"] == "12345"

    def test_post_method_bad_data_exception(self):
        post_data = {"unexpected": "data"}

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            data=post_data,
        )

        assert response.status_code == 400
        assert b"Invalid form" in response.data
