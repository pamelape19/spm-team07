from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import badge  # noqa: E402,F401
import chapter  # noqa: E402,F401
import classes  # noqa: E402,F401
import course  # noqa: E402,F401
import course_material  # noqa: E402,F401
import engineer  # noqa: E402,F401
import enrollment  #noqa: E402,F401
import hr  # noqa: E402,F401
import quiz  # noqa: E402,F401
import quiz_option  # noqa: E402,F401
import quiz_question  # noqa: E402,F401
import quiz_results  # noqa: E402,F401
import quiz  # noqa: E402,F401
import train  # noqa: E402,F401

@app.route('/')
def hello_world():
    return "<p>Hello world, It's me</p>"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
