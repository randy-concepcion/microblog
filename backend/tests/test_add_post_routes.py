import pytest
from flask_jwt_extended import create_access_token


class TestAddPostEndpointPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/add_post"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

        jwt_token = create_access_token("test-user")
        self.header = {"Authorization": f"Bearer {jwt_token}"}

    def test_no_jwt_token_raises_auth_error(self):
        post_json = {
            "title": "My test post title",
            "content": "My test post content",
            "uid": 1,
        }

        mock_add_post = self.mocker.patch("backend.add_post.routes.utils_add_post")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
        )

        assert response.status_code == 401
        assert b"Missing Authorization Header" in response.data
        mock_add_post.assert_not_called()

    def test_bad_data_raises_exception(self):
        post_json = {"unexpected": "data"}

        mock_add_post = self.mocker.patch("backend.add_post.routes.utils_add_post")

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
            headers=self.header,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_add_post.assert_not_called()

    def test_valid_post_data_returns_true(self):
        post_json = {
            "title": "My test post title",
            "content": "My test post content",
            "uid": 1,
        }

        response = self.test_client.post(
            self.endpoint,
            content_type="application/json",
            json=post_json,
            headers=self.header,
        )

        assert response.status_code == 200
        assert b"success" in response.data
