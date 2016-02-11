from app import db
from pomodoro import Pomodoro
from bson import ObjectId
import datetime

class ToDo(db.EmbeddedDocument):
    to_do_id = db.ObjectIdField(default=ObjectId, required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    title = db.StringField(max_length=255, required=True)
    description = db.StringField(max_length=500, required=True)
    complete = db.BooleanField(default=False, required=True)
    pomodoros = db.EmbeddedDocumentListField(Pomodoro)

    meta = {
        'indexes': [
            { 'fields': ['to_do_id'] }
        ]
    }
