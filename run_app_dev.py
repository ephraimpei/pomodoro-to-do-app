from app import app
from mongoengine import connect

app.config["MONGODB_SETTINGS"] = {'db': "pomodoro-to-do-app"}
app.config["SECRET_KEY"] = "psst_im_a_secret"

connect("pomodoro-to-do-app")

if __name__ == '__main__':
    app.run(debug=True)
