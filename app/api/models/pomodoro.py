from app import db
from bson import ObjectId
import datetime

class Pomodoro(db.EmbeddedDocument):
    id = db.ObjectIdField(default=ObjectId, required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    complete = db.BooleanField(default=False, required=True)
    remaining_length = db.IntField(required=True)
