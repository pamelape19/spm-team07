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

class CREATE_COURSE (db.Model):
    __tablename__ = 'CREATE_COURSE'
    date_created  = db.Column(db.DateTime, nullable=False)
    hr_email  = db.Column(db.String(50), nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)

    def __init__(self, date_created, hr_email, course_name):
        self.date_created = date_created
        self.hr_email = hr_email
        self.course_name = course_name

    def json(self):
        return {"date_created": self.date_created, "hr_email": self.hr_email, "course_name": self.course_name}


@app.route("/")
def get_all_create_course():
    create_course_list = CREATE_COURSE.query.all()
    if len(create_course_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "create_course": [create_course.json() for create_course in create_course_list]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no create_course."
        }
    ), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5011, debug=True)

