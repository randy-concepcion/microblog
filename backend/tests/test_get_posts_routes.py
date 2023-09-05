import pytest


class TestGetPostsEndpointGet:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/posts"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

    def test_call_to_get_posts_endpoint_returns_success(self):
        mock_blog_posts = [
            {
                "id": 1,
                "title": "Bob's Big Post",
                "content": "Bob's law blog post is big",
                "user": 1,
            }
        ]
        mock_get_posts = self.mocker.patch(
            "backend.get_posts.routes.utils_get_posts", return_value=mock_blog_posts
        )

        response = self.test_client.get(self.endpoint)

        mock_get_posts.assert_called_once()
        assert response.status_code == 200
