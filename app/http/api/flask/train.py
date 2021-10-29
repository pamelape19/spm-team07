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
    'dbURL') or 'mysql+mysqlconnector://root@localhost:3306/lms'  or 'mysql+mysqlconnector://root@localhost:3306/lms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)


class TRAIN (db.Model):
    __tablename__ = 'TRAIN'
    engin_email = db.Column(db.String(50), primary_key=True)
    CNo = db.Column(db.Integer, nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)

    def __init__(self, engin_email, CNo, course_name):
        self.trainer_email = engin_email
        self.CNo = CNo
        self.course_name = course_name

    def json(self):
        return {"engin_email": self.engin_email, "CNo": self.CNo, "course_name": self.course_name}

@app.route("/")
def get_all_train():
    trainlist = TRAIN.query.all()
    if len(trainlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "train": [train.json() for train in trainlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no train assignments."
        }
    ), 404

@app.route("/<string:trainer_email>")
def get_trainer(trainer_email):
    trainerClassList = TRAIN.query.filter_by(engin_email=trainer_email).all()
    if len(trainerClassList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "train": [train.json() for train in trainerClassList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No classes assigned to this trainer."
        }
    ), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)

