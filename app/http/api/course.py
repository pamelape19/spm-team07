
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


# @app.route('/')
# def hello_world():
#     return "<p>Hello world</p>"

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'dbURL') or 'mysql+mysqlconnector://root@localhost:3308/lms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class COURSE (db.Model):
    __tablename__ = 'COURSE'
    course_name = db.Column(db.String(200), primary_key=True)
    description = db.Column(db.String(700), nullable=False)
    objectives = db.Column(db.String(700), nullable=False)
    prereq_name = db.Column(db.String(200), nullable=False)

    def __init__(self, course_name, description, objectives, prereq_name):
        self.course_name = course_name
        self.description = description
        self.objectives = objectives
        self.prereq_name = prereq_name

    def json(self):
        return {"course_name": self.course_name, "description": self.description, "objectives": self.objectives, "prereq_name": self.prereq_name}


@app.route("/")
def get_all_course():
    courselist = COURSE.query.all()
    if len(courselist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "courses": [course.json() for course in courselist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no courses."
        }
    ), 404

@app.route("/<string:course_name>")
def get_course_desc(course_name):
    course_desc = COURSE.query.filter_by(course_name=course_name).first()
    if course_desc:
        return jsonify(
            {
                "code": 200,
                "data": course_desc.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Course does not exist." 
        }
    ), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)