from app import app
from flask import send_from_directory

@app.errorhandler(404)
def page_not_found(error):
    return send_from_directory(app.static_folder, "./templates/404.html"), 404

@app.route("/")
@app.route("/user/new")
def index():
    return send_from_directory(app.static_folder, "./templates/index.html")

@app.route("/user/<username>")
def show_user_page(username):
    return send_from_directory(app.static_folder, "./templates/index.html")

@app.route("/user/<username>/todo/<id>")
def show_to_do_id(username, id):
    return send_from_directory(app.static_folder, "./templates/index.html")
