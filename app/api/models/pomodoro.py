from flask import url_for
from app import db
import datetime

class Pomodoro(db.EmbeddedDocument):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    status = db.StringField(max_length=20, default="not_started", required=True)
    active = db.BooleanField(default=True, required=True)
