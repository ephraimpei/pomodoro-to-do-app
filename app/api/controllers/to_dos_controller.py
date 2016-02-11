from app import app
from flask import request, jsonify
from app.api.models import User, ToDo, ToDoForm
import pdb

@app.route("/user/<username>/todo", methods=["GET", "POST"])
def handle_todo_list_request(username):
    if request.method == "GET":
        return __fetch_todo_items(username)
    elif request.method == "POST":
        return __create_todo_item(username)

def __fetch_todo_items(username):
    user = User.find_by_username(username)

    if user:
        todos = User.objects.get(username=user.username).todos
        return jsonify(todos=todos)
    else:
        return jsonify(error="Could not find user."), 400

def __create_todo_item(username):
    user = User.find_by_username(username)

    if user:
        form = ToDoForm(request.form)

        if form.validate():
            new_todo = ToDo(title=form.title.data, description=form.description.data)
            if user.update(add_to_set__to_dos=new_todo):
                return jsonify(todo = new_todo,
                    message = "To do created successfully! Add some Pomodoros to it!")
            else:
                return jsonify(error="Could not create to do item."), 401
        else:
            return jsonify(errors=form.errors.items()), 400
    else:
        return jsonify(error="Could not find user."), 400
