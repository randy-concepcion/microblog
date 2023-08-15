import pytest
from backend.users.utils import get_users


class TestGetUsers:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, init_database):
        self.mocker = mocker
        self.init_db = init_database

    def test_returns_users_dict(self):
        result = get_users()
        result = result[0]

        assert result["id"] == 1
        assert result["username"] == "bobloblaw"
        assert result["email"] == "bob.loblaw@lawblog.com"
        assert result["password"] == "12345"
