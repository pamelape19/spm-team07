import os
from typing import Coroutine
from flask import Flask, request, jsonify, send_file
from io import BytesIO
import enum

from flask.helpers import flash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy import func

from datetime import datetime

from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'dbURL') or 'mysql+mysqlconnector://root@localhost:3306/lms'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)


class QUIZ_QUESTION (db.Model):
    __tablename__ = 'QUIZ_QUESTION'
    question = db.Column(db.String(1000), nullable=False)
    questionNo = db.Column(db.Integer, nullable=False, primary_key=True )
    question_type = db.Column(db.Enum('mcq', 't/f'), nullable=False ) 
    quizID= db.Column(db.String(50),nullable=False, primary_key=True)

    def __init__(self, question, questionNo, question_type,quizID):
        self.question = question
        self.questionNo = questionNo
        self.question_type = question_type
        self.quizID = quizID

    def json(self):
        return {"question": self.question, "questionNo": self.questionNo, "question_type": self.question_type,"quizID": self.quizID}


@app.route("/")
def get_all_quiz_question():
    quiz_question_list = QUIZ_QUESTION.query.all()
    if len(quiz_question_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quiz_question": [quiz_question.json() for quiz_question in quiz_question_list]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no quiz_question."
        }
    ), 404

@app.route("/<int:quizID>")
def find_quiz_qn_by_quizID(quizID):
    quizQns = QUIZ_QUESTION.query.filter_by(quizID=quizID).all()
    if quizQns:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quizQns": [quizQn.json() for quizQn in quizQns]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No quiz questions available for this quiz."
        }
    ), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009, debug=True)

