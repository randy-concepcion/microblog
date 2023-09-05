from backend.models import User


class TestUserModel:
    def test_new_user(self):
        user = User("bob", "loblaw@lawblog.com", "12345")
        assert user.username == "bob"
        assert user.email == "loblaw@lawblog.com"
        assert user.pwd, "12345"
