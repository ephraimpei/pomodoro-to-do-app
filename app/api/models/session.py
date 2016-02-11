from app import db
import datetime
import uuid

class Session(db.EmbeddedDocument):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    session_token = db.StringField(max_length=255, required=True)

    @classmethod
    def generate_session_token(cls):
        return str(uuid.uuid1())

    def __repr__(self):
        return '<session {0}>'.format(self.session_token)

    meta = {
        'indexes': [
            { 'fields': ['session_token'],  'expireAfterSeconds': 3600 }
        ],
        'ordering': ['-created_at']
    }
