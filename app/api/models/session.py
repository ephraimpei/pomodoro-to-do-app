from app import db
import datetime
import uuid

class Session(db.Document):
    session_token = db.StringField(max_length=255, required=True)
    username = db.StringField(max_length=25, required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)

    @classmethod
    def generate_session_token(cls):
        return str(uuid.uuid1())

    def __str__(self):
        return '[session {0}][username {1}]'.format(self.session_token, self.username)

    meta = {
        'indexes': [
            { 'fields': ['session_token'],  'expireAfterSeconds': 3600 }
        ]
    }
