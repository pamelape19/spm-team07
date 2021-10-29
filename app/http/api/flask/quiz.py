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
    'dbURL')or 'mysql+mysqlconnector://root@localhost:3308/lms'  or 'mysql+mysqlconnector://root@localhost:3306/lms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class QUIZ (db.Model):
    __tablename__ = 'QUIZ'
    quizID  = db.Column(db.String(50), nullable=False, primary_key=True)
    CNo = db.Column(db.Integer, nullable=False)
    course_name = db.Column(db.String(100), nullable=False)
    chapter_name  = db.Column(db.String(100))
    duration = db.Column(db.Integer)
    total_questions = db.Column(db.Integer, nullable=False)


    def __init__(self, quizID, CNo, course_name, chapter_name, duration, total_questions):
        self.quizID = quizID
        self.CNo = CNo
        self.course_name = course_name
        self.chapter_name = chapter_name
        self.duration = duration
        self.total_questions = total_questions

    def json(self):
        return {"quizID": self.quizID, "CNo": self.CNo, "course_name": self.course_name, "chapter_name": self.chapter_name, "duration": self.duration, "total_questions": self.total_questions}


@app.route("/")
def get_all_quiz():
    quizlist = QUIZ.query.all()
    if len(quizlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quiz": [quiz.json() for quiz in quizlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no quiz."
        }
    ), 404

@app.route("/<string:course_name>/<int:CNo>")
def find_quizzes_by_course(course_name, CNo):
    course_quizzes = QUIZ.query.filter_by(course_name=course_name, CNo=CNo).all()
    if course_quizzes:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "courseQuizzes": [course_quiz.json() for course_quiz in course_quizzes]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No quiz available for this class of the course."
        }
    ), 404

@app.route("/<string:course_name>/<int:CNo>/<string:chapter_name>")
def find_quizzes_by_chapter(course_name, CNo, chapter_name):
    chapter_quiz = QUIZ.query.filter_by(course_name=course_name, CNo=CNo, chapter_name=chapter_name).first()
    if chapter_quiz:
        return jsonify(
            {
                "code": 200,
                "data": chapter_quiz.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No quiz available for this chapter of the class."
        }
    ), 404

@app.route("/<string:course_name>/<int:CNo>", methods=['POST'])
def addNewQuiz(Course_name,CNo,):
    return "hi"



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5008, debug=True)
