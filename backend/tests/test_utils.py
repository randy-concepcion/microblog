import pytest
from backend.utils import (
    add_user,
    get_posts,
    get_users,
    remove_user,
)
from sqlalchemy.exc import SQLAlchemyError


class TestGetPosts:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, init_database):
        self.init_db = init_database
        self.mocker = mocker

    def test_returns_posts_dict(self):
        mock_user_value = {
            "id": 1,
            "username": "bobbyloblaw",
            "email": "bob.loblaw@lawblog.com",
            "password": "12345",
        }
        self.mocker.patch("backend.utils.get_user", return_value=mock_user_value)
        expected = [
            {
                "id": 1,
                "title": "Bob's Big Post",
                "content": "Bob's law blog post is big",
                "user": 1,
            }
        ]

        result = get_posts()

        assert result[0]["id"] == expected[0]["id"]
        assert result[0]["title"] == expected[0]["title"]
        assert result[0]["content"] == expected[0]["content"]
        assert result[0]["user"]["id"] == expected[0]["user"]


class TestGetUsers:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, init_database):
        self.init_db = init_database

    def test_returns_users_dict(self):
        result = get_users()
        result = result[0]

        assert result["id"] == 1
        assert result["username"] == "bobloblaw"
        assert result["email"] == "bob.loblaw@lawblog.com"
        assert result["password"] == "12345"


class TestAddUser:
    @pytest.fixture(autouse=True)
    def __init_fixtures(self, mocker, init_database):
        self.mocker = mocker
        self.init_db = init_database

    def test_valid_data_returns_true(self):
        result = add_user("test_username", "test@email.com", "test_pwd")

        assert result is True

    def test_bad_data_returns_false(self):
        result = add_user("test_username", None, None)

        assert result is False

    def test_db_session_add_user_raises_exception(self):
        mock_db = self.mocker.patch("backend.db.session.commit")
        mock_db.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")

        with pytest.raises(SQLAlchemyError):
            add_user("test_username", "test_email", "test_pwd")


class TestRemoveUser:
    @pytest.fixture(autouse=True)
    def __init_fixtures(self, mocker, init_database):
        self.mocker = mocker
        self.init_db = init_database

    def test_valid_uid_returns_true(self):
        self.mocker.resetall()
        result = remove_user("1")

        assert result is True

    def test_no_uid_returns_false(self):
        result = remove_user(None)

        assert result is False

    def test_db_session_add_user_raises_exception(self):
        mock_db = self.mocker.patch("backend.db.session.commit")
        mock_db.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")

        with pytest.raises(SQLAlchemyError):
            remove_user("1")
