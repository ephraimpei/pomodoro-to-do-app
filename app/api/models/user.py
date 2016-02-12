from app import db
import bcrypt
import uuid
import pdb

class User(db.Document):
    username = db.StringField(max_length=25, required=True)
    password_digest = db.StringField(max_length=255, required=True)

    @classmethod
    def validate_user_credentials(cls, user, password):
        if user:
            return bcrypt.hashpw(password.encode('utf-8'),
                user.password_digest.encode('utf-8')) == user.password_digest
        else:
            return False

    @classmethod
    def find_by_username(cls, username):
        user = User.objects(username = username)

        if user:
            return user[0]
        else:
            return None

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
