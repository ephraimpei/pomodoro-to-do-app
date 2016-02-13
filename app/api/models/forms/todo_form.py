from wtforms import Form, StringField, PasswordField, IntegerField, validators
from app.api.models.validations import validate_num_pomodoros

class ToDoForm(Form):
    title = StringField('title', [
        validators.Required(),
        validators.Length(min=1, max=100)
    ])
    description = StringField('description', [
        validators.Required(),
        validators.Length(min=1, max=500)
    ])
    num_pomodoros = IntegerField('num_pomodoros', [
        validators.Required(),
        validate_num_pomodoros
    ])
    pomodoro_length = IntegerField('pomodoro_length',[
        validators.Required(),
        validators.NumberRange(min=1, max=60)
    ])
    break_length = IntegerField('break_length',[
        validators.Required(),
        validators.NumberRange(min=1, max=60)
    ])
    long_break_length = IntegerField('long_break_length',[
        validators.Required(),
        validators.NumberRange(min=1, max=60)
    ])
