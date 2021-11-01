from flask import Flask, jsonify, request

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'dbURL')or 'mysql+mysqlconnector://root@localhost:3306/lms'   
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class QUIZ_OPTION (db.Model):
    __tablename__ = 'QUIZ_OPTION'
    optionNo = db.Column(db.Integer, nullable=False, primary_key=True)
    option_value = db.Column(db.String(500), nullable=False)
    quizID = db.Column(db.String(50), nullable=False, primary_key=True)
    questionNo = db.Column(db.Integer, nullable=False, primary_key=True)
    selected = db.Column(db.Boolean, nullable=False)
    answer = db.Column(db.Boolean, nullable=False)

    def __init__(self, optionNo, option_value, quizID, questionNo, selected, answer ):
        self.optionNo = optionNo
        self.option_value = option_value
        self.quizID = quizID
        self.questionNo = questionNo
        self.selected = selected
        self.answer = answer

    def json(self):
        return {"optionNo": self.optionNo, "option_value": self.option_value, "quizID": self.quizID,
        "questionNo": self.questionNo, "selected": self.selected, "answer": self.answer}


@app.route("/")
def get_all_quiz_option():
    quiz_option_list = QUIZ_OPTION.query.all()
    if len(quiz_option_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quiz_option": [quiz_option.json() for quiz_option in quiz_option_list]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no quiz_option."
        }
    ), 404

@app.route("/<int:quizID>")
def quiz_options_by_quizID(quizID):
    quizOptions = QUIZ_OPTION.query.filter_by(quizID=quizID).all()
    if quizOptions:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quizOptions": [quizOption.json() for quizOption in quizOptions]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No quiz options available for this quiz."
        }
    ), 404


@app.route("/<int:quizID>", methods=['POST'])
def addNewOption(quizID):
    data = request.json


    try:
        for option in data["data"]:
            
            new_option= QUIZ_OPTION(optionNo=option["optionNo"],option_value=option["question_no"], quizID=option['option_value'], questionNo=quizID,selected=option["selected"], answer=option["answer"])

            db.session.add(new_option)
            db.session.commit()
 

    except Exception as e:
        return 'Quiz could not be added'
    return 'Quiz has been added'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5013, debug=True)

