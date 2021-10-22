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


class ENROLLMENT (db.Model):
    __tablename__ = 'ENROLLMENT'
    engin_email = db.Column(db.String(50), primary_key=True)
    CNo = db.Column(db.Integer, nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)
    assigned = db.Column(db.Boolean, nullable=False)

    def __init__(self, engin_email, CNo, course_name, assigned):
        self.engin_email = engin_email
        self.CNo = CNo
        self.course_name = course_name
        self.assigned = assigned

    def json(self):
        return {"engin_email": self.engin_email, "CNo": self.CNo, "course_name": self.course_name, "assigned": self.assigned}


@app.route("/enrollment")
def get_all_enrollment():
    enrollmentlist = ENROLLMENT.query.all()
    if len(enrollmentlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "enrollment": [enrollment.json() for enrollment in enrollmentlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no enrollment."
        }
    ), 404

@app.route("/enrollment/<string:engin_email>")
def find_enrollment_by_engin_email(engin_email):
    enrolled_engins = ENROLLMENT.query.filter_by(engin_email=engin_email).all()
    # return "hi"
    if enrolled_engins:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "enginClasses": [engin_classes.json() for engin_classes in enrolled_engins]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Engineer is not enrolled."
        }
    ), 404



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)

