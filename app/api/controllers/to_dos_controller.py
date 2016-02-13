from app import app
from flask import request, jsonify, send_from_directory
from app.api.models import User, ToDo, ToDoForm, Pomodoro
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
        return jsonify(error="Could not find user."), 404

@app.route("/user/<username>/todo/<id>", methods=["GET", "PUT", "DELETE"])
def handle_single_to_do_request(username, id):
    user = User.find_by_username(username)

    if user:
        if request.method == "GET":
            return __fetch_single_to_do_item(user, id)
        elif request.method == "PUT":
            return __update_to_do_item(user, id)
        elif request.method == "DELETE":
            return __delete_to_do_item(user, id)
    else:
        return jsonify(error="Could not find user."), 404

@app.route("/user/<username>/todo/<id>/finish", methods=["PUT"])
def handle_complete_pomodoro(username, id):
    user = User.find_by_username(username)

    if user:
        to_do = ToDo.objects.get(author=user, id=id)
        pomodoros = to_do.pomodoros
        num_complete = int(request.form['num_complete'])

        pomodoros[num_complete].complete = True

        message = "Pomodoro completed!"

        if ((num_complete + 1) % 4) == 0:
            message += " Long break time!"
        else:
            message += " Break time!"

        if num_complete + 1 == len(pomodoros):
            to_do.complete = True
            message = "To do is COMPLETE! Woo hoo!"

        if to_do.save():
            return jsonify(to_do = to_do, message = message)
        else:
            return jsonify(error="Could not update to do item."), 401
    else:
        return jsonify(error="Could not find user."), 404

@app.route("/user/<username>/todos/search", methods=["GET"])
def handle_to_do_search(username):
    user = User.find_by_username(username)
    title = request.args.get('title')

    if user:
        to_dos = ToDo.objects.filter(title__icontains=title, author=user)
        return jsonify(to_dos=to_dos)
    else:
        return jsonify(error="Could not find user."), 404

def __fetch_to_do_items(user):
    to_dos = ToDo.objects(author=user)
    return jsonify(to_dos=to_dos)

def __create_to_do_item(user):
    form = ToDoForm(request.form)

    if form.validate():
        new_to_do = ToDo(title=form.title.data,
            description=form.description.data,
            pomodoro_length=form.pomodoro_length.data,
            break_length=form.break_length.data,
            long_break_length=form.long_break_length.data)

        new_to_do.author = user

        for i in range(form.num_pomodoros.data):
            new_pomodoro = Pomodoro(remaining_length=form.pomodoro_length.data)
            new_to_do.pomodoros.append(new_pomodoro)

        if new_to_do.save():
            return jsonify(to_do = new_to_do,
                message = "To do created successfully!")
        else:
            return jsonify(error="Could not create to do item."), 401
    else:
        return jsonify(errors=form.errors.items()), 400

def __fetch_single_to_do_item(user, id):
    to_dos = ToDo.objects.get(author=user, id=id)

    return jsonify(to_do=to_do)

def __update_to_do_item(user, id):
    form = ToDoForm(request.form)

    if form.validate():
        to_do = ToDo.objects.get(id=id)
        to_do.title = form.title.data
        to_do.description = form.description.data
        to_do.pomodoro_length = form.pomodoro_length.data
        to_do.break_length = form.break_length.data
        to_do.long_break_length = form.long_break_length.data

        prev_num_pomodoros = to_do.pomodoros.count()

        # adding pomodoros
        if form.num_pomodoros.data > prev_num_pomodoros:
            # update remaining length of already existing pomodoros,
            # skipping ones that are complete
            for i in range(prev_num_pomodoros):
                pomodoro = to_do.pomodoros[i]
                if not pomodoro.complete:
                    pomodoro.remaining_length = form.pomodoro_length.data

            # append additional pomodoros
            diff = form.num_pomodoros.data - prev_num_pomodoros

            for i in range(diff):
                new_pomodoro = Pomodoro(remaining_length=form.pomodoro_length.data)
                to_do.pomodoros.append(new_pomodoro)

        # removing pomodoros
        elif form.num_pomodoros.data < prev_num_pomodoros:
            # remove difference in prev vs updated number of pomodoros
            for i in range(prev_num_pomodoros - form.num_pomodoros.data):
                to_do.pomodoros.pop()

            # update remaining length of already existing pomodoros,
            # skipping ones that are complete or in progress
            for i in range(form.num_pomodoros.data):
                pomodoro = to_do.pomodoros[i]

                if not pomodoro.complete:
                    pomodoro.remaining_length = form.pomodoro_length.data

        if to_do.save():
            return jsonify(to_do = to_do,
                message = "To do updated successfully!")
        else:
            return jsonify(error="Could not update to do item."), 401

    else:
        return jsonify(errors=form.errors.items()), 400

def __delete_to_do_item(user, id):
    to_do = ToDo.objects.get(id=id)

    to_do.delete()

    return jsonify(to_do=to_do, message="To do deleted successfully!")
