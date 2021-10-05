import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from datetime import datetime

from os import environ

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "<p>Hello world</p>"

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root' + \
#                                     '@localhost:3308/lms'
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://root@localhost:3308/lms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                        'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

# engineer database
class ENGINEER (db.Model):
    __tablename__ = 'ENGINEER'
    engin_email = db.Column(db.String(50), primary_key=True)
    engin_name = db.Column(db.String(60), nullable=False)
    trainer = db.Column(db.Boolean, nullable=False)
    
    def __init__(self, engin_email, engin_name, trainer):
        self.engin_email = engin_email
        self.engin_name = engin_name
        self.trainer = trainer

    def json(self):
         return {"engin_email": self.engin_email, "engin_name": self.engin_name, "trainer": self.trainer}

@app.route("/engineer")
def get_all_engineer():
    engineerlist = ENGINEER.query.all()
    if len(engineerlist):
        return jsonify(
        {
            "code": 200,
            "data": {
                "engineers": [engineer.json() for engineer in engineerlist]
            }
        }
    )
    return jsonify(
    {
        "code": 404,
        "message": "There are no engineers."
    }
    ), 404

# course database
class COURSE (db.Model):
    __tablename__ = 'COURSE'
    course_name  = db.Column(db.String(200), primary_key=True)
    description  = db.Column(db.String(700), nullable=False)
    objectives  = db.Column(db.String(700), nullable=False)
    prereq_name = db.Column(db.String(200), nullable=False)
    
    def __init__(self, course_name, description, objectives, prereq_name):
        self.course_name = course_name
        self.description = description
        self.objectives = objectives
        self.prereq_name = prereq_name

    def json(self):
         return {"course_name": self.course_name, "description": self.description, "objectives": self.objectives, "prereq_name": self.prereq_name}

@app.route("/course")
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


# class database
class CLASS (db.Model):
    __tablename__ = 'CLASS'
    CNo = db.Column(db.Integer, primary_key=True)
    Start_date = db.Column(db.DateTime, nullable=False)
    End_date   = db.Column(db.DateTime, nullable=False)
    Start_time = db.Column(db.DateTime, nullable=False)
    End_time = db.Column(db.DateTime, nullable=False)
    Capacity =  db.Column(db.Integer, nullable=False)
    Course_name = db.Column(db.String(200), primary_key=True)

    def __init__(self, CNo, Start_date, End_date, Start_time,End_time,Capacity,Course_name):
        self.CNo = CNo
        self.Start_date = Start_date
        self.End_date = End_date
        self.Start_time = Start_time
        self.End_time = End_time
        self.Capacity = Capacity
        self.Course_name = Course_name

    def json(self):
         return {"CNo": self.CNo, "Start_date": self.Start_date, "End_date": self.End_date, 
         "Start_time": self.Start_time, "End_time": self.End_time, "Capacity": self.Capacity, "Course_name": self.Course_name}

@app.route("/classes")
def get_all_classes():
    classlist = COURSE.query.all()
    if len(classlist):
        return jsonify(
        {
            "code": 200,
            "data": {
                "engineers": [classes.json() for classes in classlist]
            }
        }
    )
    return jsonify(
    {
        "code": 404,
        "message": "There are no classes."
    }
    ), 404

# ENROLLMENT database
class ENROLLMENT (db.Model):
    __tablename__ = 'ENROLLMENT'
    engin_email = db.Column(db.String(50), primary_key=True)
    CNo  = db.Column(db.Integer, nullable=False, primary_key=True)
    course_name  = db.Column(db.String(100), nullable=False, primary_key=True)
    
    def __init__(self, engin_email, CNo, course_name):
        self.engin_email = engin_email
        self.CNo = CNo
        self.course_name = course_name

    def json(self):
         return {"engin_email": self.engin_email, "CNo": self.CNo, "course_name": self.course_name}

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


if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": managing engineers ...")
    app.debug = True
    app.run(host='0.0.0.0', port=7001, debug=True)