import pytest


class TestDeletePostEndpointDelete:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, test_client, init_database):
        self.endpoint = "/api/delete_post"
        self.mocker = mocker
        self.test_client = test_client
        self.init_db = init_database

    def test_bad_data_raises_exception(self):
        delete_json = {"unexpected": "data"}

        mock_delete_post = self.mocker.patch(
            "backend.delete_post.routes.utils_delete_post"
        )

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            json=delete_json,
        )

        assert response.status_code == 400
        assert b"error" in response.data
        mock_delete_post.assert_not_called()

    def test_valid_post_data_returns_true(self):
        delete_json = {"post_id": 1}

        response = self.test_client.delete(
            self.endpoint,
            content_type="application/json",
            json=delete_json,
        )

        assert response.status_code == 200
        assert b"success" in response.data