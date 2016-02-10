from app import app
from flask import request, session, jsonify
from app.api.models import User, RegistrationForm
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

def __create_user(username):
    form = RegistrationForm(request.form)

    if form.validate():
        pdb.set_trace()
        new_user = User(username = form.username.data)
        new_user.generate_password_digest(form.password.data)
        new_user.reset_session_token()

        if new_user.save():
            user_response = __build_user_response_object(new_user)

            return jsonify(user = user_response,
                message = "User creation successful! Welcome {0}!".format(new_user.username))
        else:
            return jsonify(error="Could not create user."), 401
    else:
        return jsonify(errors=form.errors.items()), 400

def __build_user_response_object(user):
    return { "username": user.username }
