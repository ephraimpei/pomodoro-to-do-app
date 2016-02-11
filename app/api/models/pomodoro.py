from app import db
from bson import ObjectId
import datetime

class Pomodoro(db.EmbeddedDocument):
    to_do_id = db.ObjectIdField(default=ObjectId, required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    status = db.StringField(max_length=20, default="not_started", required=True)
    active = db.BooleanField(default=True, required=True)
