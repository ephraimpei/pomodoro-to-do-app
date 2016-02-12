from app import app
from flask import request, jsonify
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

    if cookie:
        session = Session.objects(session_token=cookie)

        if session:
            username = session[0].username
            user = User.objects.get(username=username)
            return jsonify(user=user_response_obj(user),
                message = "Welcome back {0}!".format(user.username))
        else:
            return jsonify(user={})
    else:
        return jsonify(user={})

def __create_session():
    form = LoginForm(request.form)

    if form.validate():
        user = User.find_by_username(form.username.data)
        session = Session(session_token=Session.generate_session_token(),
            username=user.username)

        session.save()

        __maintain_max_session_limit(user)

        response = jsonify(user=user_response_obj(user),
            message = "Login successful! Welcome {0}!".format(user.username))
        response.set_cookie('pomodoro-to-do', session.session_token)

        return response
    else:
        return jsonify(errors=form.errors.items()), 400

def __destroy_session():
    cookie = request.cookies.get('pomodoro-to-do')
    session = Session.objects.get(session_token=cookie)
    user = User.objects.get(username=session.username)

    session.delete()

    response = jsonify(user={},
        message="Goodbye {0}!".format(user.username))
    response.set_cookie('pomodoro-to-do', '', expires=0)

    return response

def __maintain_max_session_limit(user):
    sessions = Session.objects(username=user.username)
    num_sessions = sessions.count()

    if num_sessions > 5:
        oldest_session = sessions[0]
        oldest_session.delete()
