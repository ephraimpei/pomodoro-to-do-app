from app import app
from flask import request, jsonify
from app.api.models import User, ToDo, ToDoForm
import pdb

@app.route("/user/<username>/todo", methods=["GET", "POST"])
def handle_to_do_request(username):
    user = User.find_by_username(username)

    if user:
        if request.method == "GET":
            return __fetch_to_do_items(user)
        elif request.method == "POST":
            return __create_to_do_item(user)
    else:
        return jsonify(error="Could not find user."), 400

@app.route("/user/<username>/todo/<to_do_id>", methods=["PUT", "DELETE"])
def handle_single_to_do_request(username, to_do_id):
    user = User.find_by_username(username)

    if user:
        if request.method == "PUT":
            return __update_to_do_item(user, to_do_id)
        elif request.method == "DELETE":
            return __delete_to_do_item(user, to_do_id)
    else:
        return jsonify(error="Could not find user."), 400

def __fetch_to_do_items(user):
    to_dos = User.objects.get(username=user.username).to_dos
    return jsonify(to_dos=to_dos)

def __create_to_do_item(user):
    form = ToDoForm(request.form)

    if form.validate():
        new_to_do = ToDo(title=form.title.data, description=form.description.data)
        if user.update(add_to_set__to_dos=new_to_do):
            return jsonify(to_do = new_to_do,
                message = "To do created successfully! Add some Pomodoros to it!")
        else:
            return jsonify(error="Could not create to do item."), 401
    else:
        return jsonify(errors=form.errors.items()), 400

def __update_to_do_item(user, to_do_id):
    pass

def __delete_to_do_item(user, to_do_id):
    to_do = User.objects.get(username=user.username).to_dos.filter(to_do_id=to_do_id).first()

    User.objects(username=user.username).update_one(pull__to_dos__to_do_id=to_do_id)

    return jsonify(to_do=to_do, message="To do deleted successfully!")
