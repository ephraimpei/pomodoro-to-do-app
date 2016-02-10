from app import db
import uuid
import pdb

class Session(db.EmbeddedDocument):
    session_token = db.StringField(max_length=255, required=True)

    @classmethod
    def generate_session_token(cls):
        return str(uuid.uuid1())

    def destroy(self):
        if self.delete():
            return True
        else:
            return False

    def __repr__(self):
        return '<session {0}>'.format(self.session_token)

    meta = {
        'indexes': [
            'session_token',
            {
                'expireAfterSeconds': 3600
            }
        ],
        'max_documents': 4
    }
