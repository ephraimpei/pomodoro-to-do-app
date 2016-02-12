from app.api.models import ToDo
from wtforms import ValidationError

def validate_num_pomodoros(form, field):
    if form.num_pomodoros.data < 1:
        raise ValidationError("Can't have less than 1 Pomodoro!")
    elif form.num_pomodoros.data > 50:
        raise ValidationError("Can't have more than 100 Pomodoros!")
