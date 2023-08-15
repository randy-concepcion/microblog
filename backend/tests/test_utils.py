import pytest
from backend.users.utils import (
    add_user,
    get_users,
    remove_user,
)
from sqlalchemy.exc import SQLAlchemyError


class TestGetUsers:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, init_database):
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
