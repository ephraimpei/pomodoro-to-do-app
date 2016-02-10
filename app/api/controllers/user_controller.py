from app import app
from flask import request, session, jsonify
from app.api.models import User, RegistrationForm
from app.api.utilities import user_response_obj
import pdb

@app.route("/user/<username>", methods=["GET", "POST", "PUT", "DELETE"])
def handle_user_request(username):
    if request.method == "GET":
        return __show_user(username)
    elif request.method == "POST":
        return __create_user(username)
    elif request.method == "PUT":
        return __update_user(username)
    elif request.method == "DELETE":
        return __destroy_user(username)

def __show_user(username):
    user = User.find_by_username(username)

    if user:
        return jsonify(user = user_response_obj(user[0]))
    else:
        return jsonify(error="Could not find user."), 400

def __create_user(username):
    form = RegistrationForm(request.form)

    if form.validate():
        new_user = User(username = form.username.data)
        new_user.generate_password_digest(form.password.data)

        if new_user.save():
            return jsonify(user = user_response_obj(new_user),
                message = "User creation successful! Welcome {0}!".format(new_user.username))
        else:
            return jsonify(error="Could not create user."), 401
    else:
        return jsonify(errors=form.errors.items()), 400
