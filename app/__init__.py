import os
from flask import Flask
from flask.ext.mongoengine import MongoEngine

pomodoro_db_name = os.environ['POMODORO_DB_NAME']
mongolab_uri = os.environ['MONGOLAB_URI']

app = Flask(__name__, static_url_path="", static_folder="static")

#Local MongoDB connection settings
# app.config["MONGODB_SETTINGS"] = {
#     "DB": pomodoro_db_name
# }

#MongoLab db connection settings
app.config["MONGODB_SETTINGS"] = {
    "DB": pomodoro_db_name,
    "host": mongolab_uri
}

app.config["SECRET_KEY"] = "psst_im_a_secret"

db = MongoEngine(app)

from app.api.controllers import *
