from app import app
from flask import request, jsonify
from app.api.models import User, ToDo, ToDoForm
import pdb

@app.route("/user/<username>/todo", methods=["GET", "POST"])
def handle_to_do_list_request(username):
    if request.method == "GET":
        return __fetch_to_do_items(username)
    elif request.method == "POST":
        return __create_to_do_item(username)

def __fetch_to_do_items(username):
    user = User.find_by_username(username)

    if user:
        to_dos = User.objects.get(username=user.username).to_dos
        return jsonify(to_dos=to_dos)
    else:
        return jsonify(error="Could not find user."), 400

def __create_to_do_item(username):
    user = User.find_by_username(username)

    if user:
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
    else:
        return jsonify(error="Could not find user."), 400
