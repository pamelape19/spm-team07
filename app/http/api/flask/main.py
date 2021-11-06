from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import badge
import chapter
import classes
import course
import course_material
import engineer
import enrollment
import hr
import quiz
import quiz_option
import quiz_question
import quiz_results
import quiz
import train

@app.route('/')
def hello_world():
    return "<p>Hello world, It's me</p>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

