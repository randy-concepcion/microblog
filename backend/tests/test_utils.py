import pytest
from backend.utils import (
    add_post,
    add_user,
    get_posts,
    get_user_posts,
    get_user,
    get_users,
    remove_user,
)
from sqlalchemy.exc import SQLAlchemyError


class TestAddPost:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, init_database, mocker):
        self.init_db = init_database
        self.mocker = mocker

    @pytest.mark.parametrize(
        "title,content,uid",
        [
            ("some title", "some content", None),
            ("some title", None, 1),
            (None, "some content", 1),
            (None, None, None),
            ("some title", None, None),
            (None, "some content", None),
            (None, None, 1),
        ],
    )
    def test_missing_required_values_returns_false(self, title, content, uid):
        result = add_post(title, content, uid)
        assert result is False

    def test_valid_values_returns_true(self):
        title = "some title"
        content = "some content"
        uid = 1

        mock_db_add = self.mocker.patch("backend.db.session.add")
        mock_db_commit = self.mocker.patch("backend.db.session.commit")

        result = add_post(title, content, uid)

        mock_db_add.assert_called_once()
        mock_db_commit.assert_called_once()
        assert result is True

    def test_db_session_add_post_raises_exception(self):
        mock_db = self.mocker.patch("backend.db.session.commit")
        mock_db.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")

        with pytest.raises(SQLAlchemyError):
            add_post("some title", "some content", 1)


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


class TestGetUserPosts:
    @pytest.fixture(autouse=True)
    def __inject_fixtures(self, mocker, init_database):
        self.init_db = init_database
        self.mocker = mocker

    def test_user_found_returns_posts_dict(self):
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
                "uid": 1,
            }
        ]

        result = get_user_posts(1)

        assert result[0]["id"] == expected[0]["id"]
        assert result[0]["title"] == expected[0]["title"]
        assert result[0]["content"] == expected[0]["content"]
        assert result[0]["uid"] == expected[0]["uid"]

    def test_user_not_found_returns_empty_dict(self):
        mock_user_value = {
            "id": 1,
            "username": "bobbyloblaw",
            "email": "bob.loblaw@lawblog.com",
            "password": "12345",
        }
        self.mocker.patch("backend.utils.get_user", return_value=mock_user_value)
        expected = []

        result = get_user_posts(2)

        assert expected == result


class TestGetUser:
    @pytest.fixture(autouse=True)
    def __init_fixtures(self, init_database):
        self.init_db = init_database

    def test_returns_valid_user(self):
        expected = {
            "id": 1,
            "username": "bobloblaw",
            "email": "bob.loblaw@lawblog.com",
            "password": "12345",
        }

        result = get_user(1)

        assert result["id"] == expected["id"]
        assert result["username"] == expected["username"]
        assert result["email"] == expected["email"]
        assert result["password"] == expected["password"]


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

    def test_db_session_remove_user_raises_exception(self):
        mock_db = self.mocker.patch("backend.db.session.commit")
        mock_db.side_effect = SQLAlchemyError("Forced testing SQLAlchemyError")

        with pytest.raises(SQLAlchemyError):
            remove_user("1")
