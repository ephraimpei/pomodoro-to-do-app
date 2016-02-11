from app.api.models import User
from wtforms import ValidationError

def check_if_username_taken(form, field):
    if User.find_by_username(form.username.data):
        raise ValidationError("Username already taken")

def check_if_username_exists(form, field):
    if not User.find_by_username(form.username.data):
        raise ValidationError("Username not found")

def validate_user_credentials(form, field):
    user = User.find_by_username(form.username.data)

    if user and not User.validate_user_credentials(user, form.password.data):
        raise ValidationError("Invalid credentials")
