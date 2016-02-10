from flask import url_for
from app import db
from to_do import ToDo
import bcrypt
import uuid

class User(db.Document):
    username = db.StringField(max_length=25, required=True)
    password_digest = db.StringField(max_length=255, required=True)
    session_token = db.StringField(max_length=255, required=True)
    to_dos = db.ListField(db.EmbeddedDocumentField(ToDo))

    @classmethod
    def generate_session_token(cls):
        return str(uuid.uuid1())

    @classmethod
    def validate_user_credentials(cls, user, password):
        return user.password_digest == bcrypt.hashpw(password, user.password_digest)

    @classmethod
    def find_by_username(cls, username):
        return User.objects(username = username)

    @classmethod
    def find_by_session_token(cls, session_token):
        return User.objects(session_token = session_token)

    @classmethod
    def destroy(cls, user):
        user.delete()
        return user

    def generate_password_digest(self, password):
        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(password, salt)
        self.password_digest = hash

    def reset_session_token(self):
        self.session_token = User.generate_session_token()
        self.save()
        return self.session_token

    def get_absolute_url(self):
        return url_for('user', kwargs={"username": self.username})

    def __str__(self):
        return '<username {}>'.format(self.username)

    meta = {
        'indexes': ['username', 'session_token'],
        'ordering': ['+username']
    }
