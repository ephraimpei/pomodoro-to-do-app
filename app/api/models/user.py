from app import db
from to_do import ToDo
from session import Session
import bcrypt
import uuid

class User(db.Document):
    username = db.StringField(max_length=25, required=True)
    password_digest = db.StringField(max_length=255, required=True)
    to_dos = db.EmbeddedDocumentListField(ToDo)
    sessions = db.EmbeddedDocumentListField(Session)

    @classmethod
    def validate_user_credentials(cls, user, password):
        return bcrypt.hashpw(password.encode('utf-8'), \
            user.password_digest.encode('utf-8')) == user.password_digest

    @classmethod
    def find_by_username(cls, username):
        return User.objects(username = username)

    @classmethod
    def destroy(cls, user):
        user.delete()
        return user

    def generate_password_digest(self, password):
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.password_digest = hashed

    def __str__(self):
        return '<username {}>'.format(self.username)

    meta = {
        'indexes': ['username'],
        'ordering': ['+username']
    }
