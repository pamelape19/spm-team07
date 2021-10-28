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

class CLASSES (db.Model):
    __tablename__ = 'CLASS'
    CNo = db.Column(db.Integer, primary_key=True)
    Start_datetime = db.Column(db.DateTime, nullable=False)
    End_datetime = db.Column(db.DateTime, nullable=False)
    Capacity = db.Column(db.Integer, nullable=False)
    Course_name = db.Column(db.String(200), primary_key=True)
    engin_email = db.Column(db.String(50), nullable=False)


    def __init__(self, CNo, Start_datetime, End_datetime, Capacity, Course_name, engin_email):
        self.CNo = CNo
        self.Start_datetime = Start_datetime
        self.End_datetime = End_datetime
        self.Capacity = Capacity
        self.Course_name = Course_name
        self.engin_email = engin_email


    def json(self):
        return {"CNo": self.CNo, "Start_datetime": self.Start_datetime, "End_datetime": self.End_datetime, "Capacity": self.Capacity, "Course_name": self.Course_name, "engin_email": self.engin_email}


@app.route("/")
def get_all_classes():
    classlist = CLASSES.query.all()
    if len(classlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "classes": [classes.json() for classes in classlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no classes."
        }
    ), 404

@app.route("/<string:Course_name>/<int:CNo>")
def get_specific_class(Course_name, CNo):
    specific_class = CLASSES.query.filter_by(Course_name=Course_name, CNo=CNo).first()
    if specific_class:
        return jsonify(
            {
                "code": 200,
                "data": specific_class.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Class does not exist." 
        }
    ), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)

