from app import app
from flask import request, session, jsonify
from app.api.models import User, Session
from app.api.models.forms import LoginForm
from app.api.utilities import user_response_obj
import pdb

@app.route("/session", methods=["GET", "POST", "DELETE"])
def handle_session_request():
    if request.method == "GET":
        return __fetch_session()
    elif request.method == "POST":
        return __create_session()
    elif request.method == "DELETE":
        return __destroy_session()

def __fetch_session():
    cookie = request.cookies.get('pomodoro-to-do')
    session = User.objects.get().sessions.filter(session_token=cookie)

    if session:
        user = session._instance

        return jsonify(user=user_response_obj(user))
    else:
        return jsonify(user={})

def __create_session():
    form = LoginForm(request.form)

    if form.validate():
        user = User.find_by_username(form.username.data)
        session = Session(session_token=Session.generate_session_token())
        user.update(add_to_set__sessions=session)

        response = jsonify(user=user_response_obj(user),
            message = "Login successful! Welcome {0}!".format(user.username))
        response.set_cookie('pomodoro-to-do', session.session_token)

        return response
    else:
        return jsonify(errors=form.errors.items()), 401

def __destroy_session():
    cookie = request.cookies.get('pomodoro-to-do')
    session = User.objects.get().sessions.filter(session_token=cookie)
    user = session._instance

    User.objects(username=user.username).update_one(pull__sessions__session_token=cookie)

    response = jsonify(user=user_response_obj(user),
        message="Goodbye {0}!".format(user.username))
    response.set_cookie('pomodoro-to-do', '', expires=0)

    return response
