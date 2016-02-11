from wtforms import Form, StringField, PasswordField, validators

class ToDoForm(Form):
    title = StringField('title', [
        validators.Required()
    ])
    description = PasswordField('description', [
        validators.Required()
    ])
