from app import app
from flask import request, jsonify
from app.api.models import User, Session, RegistrationForm
from app.api.utilities import user_response_obj
import pdb

@app.route("/user/<username>", methods=["GET", "PUT", "DELETE"])
def handle_user_request(username):
    if request.method == "GET":
        return __show_user(username)
    elif request.method == "PUT":
        return __update_user(username)
    elif request.method == "DELETE":
        return __destroy_user(username)

def __show_user(username):
    user = User.find_by_username(username)

    if user:
        return jsonify(user = user_response_obj(user))
    else:
        return jsonify(error="Could not find user."), 400

@app.route("/user", methods=["POST"])
def create_user():
    form = RegistrationForm(request.form)

    if form.validate():
        new_user = User(username = form.username.data)
        new_user.generate_password_digest(form.password.data)

        if new_user.save():
            session = Session(session_token=Session.generate_session_token())
            new_user.update(add_to_set__sessions=session)
            return jsonify(user = user_response_obj(new_user),
                message = "User creation successful! Welcome {0}!".format(new_user.username))
        else:
            return jsonify(error="Could not create user."), 401
    else:
        return jsonify(errors=form.errors.items()), 400
