from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__, static_url_path="", static_folder="static")

app.config["MONGODB_SETTINGS"] = {'DB': "pomodoro-to-do-app"}
app.config["SECRET_KEY"] = "psst_im_a_secret"

db = MongoEngine(app)

from app.api.controllers import *
