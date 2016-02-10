from flask import url_for
from app import db
from pomodoro import Pomodoro
import datetime

class ToDo(db.EmbeddedDocument):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    title = db.StringField(max_length=255, required=True)
    description = db.StringField(max_length=255, required=True)
    pomodoros = db.ListField(db.EmbeddedDocumentField(Pomodoro))
