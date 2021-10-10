import os
from flask import Flask, request, jsonify
import enum
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
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'dbURL') or 'mysql+mysqlconnector://root@localhost:3306/lms'
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

# HR database
class HR (db.Model):
    __tablename__ = 'HR'
    hr_email  = db.Column(db.String(50), primary_key=True)
    hr_name  = db.Column(db.String(60), nullable=False)

    def __init__(self, hr_email, hr_name):
        self.hr_email = hr_email
        self.hr_name = hr_name

    def json(self):
        return {"hr_email": self.hr_email, "hr_name": self.hr_name}


@app.route("/hr")
def get_all_hr():
    hr_list = HR.query.all()
    if len(hr_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "engineers": [hr.json() for hr in hr_list]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no hr."
        }
    ), 404


# course database
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
        return {"CNo": self.CNo, "Start_date": self.Start_datetime, "End_date": self.End_datetime, "Capacity": self.Capacity, "Course_name": self.Course_name, "Trainer": self.engin_email}


@app.route("/classes")
def get_all_classes():
    classlist = CLASS.query.all()
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

# enrollment database


class ENROLLMENT (db.Model):
    __tablename__ = 'ENROLLMENT'
    engin_email = db.Column(db.String(50), primary_key=True)
    CNo = db.Column(db.Integer, nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)

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

# train database

class TRAIN (db.Model):
    __tablename__ = 'TRAIN'
    engin_email = db.Column(db.String(50), primary_key=True)
    CNo = db.Column(db.Integer, nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)

    def __init__(self, engin_email, CNo, course_name):
        self.engin_email = engin_email
        self.CNo = CNo
        self.course_name = course_name

    def json(self):
        return {"trainer_email": self.engin_email, "CNo": self.CNo, "course_name": self.course_name}


@app.route("/train")
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

# chapter database


class CHAPTER (db.Model):
    __tablename__ = 'CHAPTER'
    chapterNo = db.Column(db.Integer, nullable=False, primary_key=True)
    chapter_name = db.Column(db.String(100), primary_key=True)
    CNo = db.Column(db.Integer, nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)

    def __init__(self, chapterNo, chapter_name, CNo,course_name):
        self.chapterNo = chapterNo
        self.CNo = CNo
        self.chapter_name = chapter_name
        self.course_name = course_name

    def json(self):
        return {"chapterNo": self.chapterNo, "CNo": self.CNo, "chapter_name": self.chapter_name, "course_name": self.course_name}


@app.route("/chapter")
def get_all_chapter():
    chapterlist = CHAPTER.query.all()
    if len(chapterlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "enrollment": [chapter.json() for chapter in chapterlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no chapter."
        }
    ), 404


# course_material database
# class COURSE_MATERIAL (db.Model):
    __tablename__ = 'COURSE_MATERIAL'
    material_name  = db.Column(db.String(100), nullable=False)
    type  = db.Column(db.String(64), nullable=False)
    size  =  db.Column(db.Integer, nullable=False)
    # content  = db.Column(db.MediumBinary, primary_key=True) unsure
    material_id  =  db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True) 
    CNo = db.Column(db.Integer, nullable=False)
    course_name = db.Column(db.String(100), nullable=False )

    def __init__(self, material_name, type, size,material_id,CNo,course_name):
        self.material_name = material_name
        self.type = type
        self.size = size
        self.material_id = material_id
        self.CNo = CNo
        self.course_name = course_name

    def json(self):
        return {"material_name": self.material_name,"type": self.type,"size": self.size,
        "material_id": self.material_id, "CNo": self.CNo, "course_name": self.course_name}


# @app.route("/course_material")
# def get_all_course_material():
    course_material_list = COURSE_MATERIAL.query.all()
    if len(course_material_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "course_material": [course_material.json() for course_material in course_material_list]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no course_material."
        }
    ), 404


# quiz database
class QUIZ (db.Model):
    __tablename__ = 'QUIZ'
    quizID  = db.Column(db.String(50), nullable=False, primary_key=True)
    CNo = db.Column(db.Integer, nullable=False)
    course_name = db.Column(db.String(100), nullable=False)
    chapter_name  = db.Column(db.String(100))


    def __init__(self, quizID, CNo, course_name, chapter_name):
        self.quizID = quizID
        self.CNo = CNo
        self.course_name = course_name
        self.chapter_name = chapter_name

    def json(self):
        return {"quizID": self.quizID, "CNo": self.CNo, "course_name": self.course_name, "chapter_name": self.chapter_name}


@app.route("/quiz")
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



# quiz_question database
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


@app.route("/quiz_question")
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


# quiz_results database
class QUIZ_RESULTS (db.Model):
    __tablename__ = 'QUIZ_RESULTS'
    attemptNo = db.Column(db.Integer, nullable=False, primary_key=True)
    score = db.Column(db.Integer, nullable=False )
    outcome = db.Column(db.Boolean, nullable=False )
    engin_email = db.Column(db.String(50), nullable=False, primary_key=True)
    quizID= db.Column(db.String(50),nullable=False, primary_key=True)
    def __init__(self, engin_email, CNo, course_name):
        self.engin_email = engin_email
        self.CNo = CNo
        self.course_name = course_name

    def json(self):
        return {"attemptNo": self.attemptNo, "score": self.score, "outcome": self.outcome,
        "engin_email": self.engin_email, "quizID": self.quizID}


@app.route("/quiz_results")
def get_all_quiz_results():
    quiz_results_list = QUIZ_RESULTS.query.all()
    if len(quiz_results_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quiz_results": [quiz_results.json() for quiz_results in quiz_results_list]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no quiz_results."
        }
    ), 404

# create_course database
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


@app.route("/create_course")
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

# badge database

class BADGE (db.Model):
    __tablename__ = 'BADGE'
    date_completed   = db.Column(db.DateTime, nullable=False)
    engin_email   = db.Column(db.String(50), nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)


    def __init__(self, date_completed, engin_email, course_name):
        self.date_completed = date_completed
        self.engin_email = engin_email
        self.course_name = course_name

    def json(self):
        return {"date_completed": self.date_completed, "engin_email": self.engin_email, "course_name": self.course_name}


@app.route("/badge")
def get_all_badge():
    badgelist = BADGE.query.all()
    if len(badgelist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "enrollment": [badge.json() for badge in badgelist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no badge."
        }
    ), 404

# forumpost database
class FORUMPOST (db.Model):
    __tablename__ = 'FORUMPOST'
    content = db.Column(db.String(100), nullable=False)
    questionCategory = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False)
    resolved = db.Column(db.Boolean, nullable=False)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)
    engin_email = db.Column(db.String(50), nullable=False, primary_key=True )

    def __init__(self, content, questionCategory, topic, date_posted, resolved, course_name, engin_email ):
        self.content = content
        self.questionCategory = questionCategory
        self.topic = topic
        self.date_posted = date_posted
        self.resolved = resolved
        self.course_name = course_name
        self.engin_email = engin_email

    def json(self):
        return {"content": self.content, "questionCategory": self.questionCategory, "topic": self.topic,
        "date_posted": self.date_posted, "resolved": self.resolved, "course_name": self.course_name,"engin_email":self.engin_email}


@app.route("/forumpost")
def get_all_forumpost():
    forumpostlist = FORUMPOST.query.all()
    if len(forumpostlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "forumpost": [forumpost.json() for forumpost in forumpostlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no forumpost."
        }
    ), 404

#  quiz_option database
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


@app.route("/quiz_option")
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


if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) +
          ": managing engineers ...")
    app.debug = True
    app.run(host='0.0.0.0', port=7001, debug=True)
