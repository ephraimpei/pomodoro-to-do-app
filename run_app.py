import os
from app import app
from MongoEngine import connect

connect('pomodoro-to-do-app',
 host='mongodb://heroku_1d9g0hkc:h1aifmg4mssq7chsmki456jfk1@ds061395.mongolab.com:61395/heroku_1d9g0hkc')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
