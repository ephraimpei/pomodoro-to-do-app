from app import db
from user import User
from pomodoro import Pomodoro
from bson import ObjectId
import datetime

class ToDo(db.Document):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    author = db.ReferenceField(User, required=True)
    title = db.StringField(max_length=100, required=True)
    description = db.StringField(max_length=500, required=True)
    complete = db.BooleanField(default=False, required=True)
    pomodoro_length = db.IntField(require=True)
    break_length = db.IntField(require=True)
    long_break_length = db.IntField(require=True)
    pomodoros = db.EmbeddedDocumentListField(Pomodoro)
