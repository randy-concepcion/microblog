from backend.models import Users


class TestUsersModel:
    def test_new_user(self):
        user = Users("bob", "loblaw@lawblog.com", "12345")
        assert user.username == "bob"
        assert user.email == "loblaw@lawblog.com"
        assert user.pwd, "12345"
