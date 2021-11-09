# Pamela Pe
# Port 5003

from flask import Flask, jsonify, request

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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

    def __init__(self, CNo, Start_datetime,
                 End_datetime, Capacity, Course_name,
                 engin_email):
        self.CNo = CNo
        self.Start_datetime = Start_datetime
        self.End_datetime = End_datetime
        self.Capacity = Capacity
        self.Course_name = Course_name
        self.engin_email = engin_email

    def json(self):
        return {"CNo": self.CNo,
                "Start_datetime": self.Start_datetime,
                "End_datetime": self.End_datetime,
                "Capacity": self.Capacity,
                "Course_name": self.Course_name,
                "engin_email": self.engin_email}


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
    specific_class = CLASSES.query.filter_by(Course_name=Course_name,
                                             CNo=CNo).first()
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


@app.route("/<string:engin_email>/<string:course_name>/<int:classNum>")
def get_trainer_class(engin_email, course_name, classNum):
    trainer_class = CLASSES.query.filter_by(engin_email=engin_email,
                                            Course_name=course_name,
                                            CNo=classNum).first()
    if trainer_class:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "trainer_class": trainer_class.json()
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No classes assigned to this trainer."
        }
    ), 404


@app.route("/<string:Course_name>/<int:CNo>", methods=['POST'])
def add_new_class(Course_name, CNo):
    data = request.form
    startDate = data.get("startDate")
    startTime = data.get("startTime")
    endDate = data.get("endDate")
    endTime = data.get("endTime")
    Capacity = data.get("capacity")
    trainer_email = data.get("trainer")
    Start_datetime = startDate + " " + startTime + ":00"
    End_datetime = endDate + " " + endTime + ":00"
    new_class = CLASSES(Course_name=Course_name, CNo=CNo,
                        Start_datetime=Start_datetime,
                        End_datetime=End_datetime,
                        Capacity=Capacity, engin_email=trainer_email)
    try:
        db.session.add(new_class)
        db.session.commit()
    except Exception as e:
        print(e)
        return 'Class could not be created'
    return 'Class has been created'


@app.route("/<string:Course_name>")
def get_course_classes(Course_name):
    specific_course = CLASSES.query.filter_by(Course_name=Course_name).all()
    if specific_course:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "classes": [classes.json() for classes in specific_course]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No classes under this course."
        }
    ), 404


@app.route("/update-capacity/<string:Course_name>/<int:CNo>", methods=['PUT'])
def update_capacity(Course_name, CNo):
    old = CLASSES.query.filter_by(Course_name=Course_name, CNo=CNo).first()
    if old:
        try:
            old.Capacity -= 1
            db.session.commit()
        except Exception as e:
            print(e)
            return "Class capacity could not be updated."
        return "Class capacity was updated."

# @app.route("/<int:Capacity>", methods=['POST'])
# def addNewCapacity(Capacity):
#     data = request.get_json()
#     new_capacity = CLASSES(Course_name=data['Course_name'],
#     CNo=data['CNo'], Start_datetime=data['Start_datetime'],
#     End_datetime=data['End_datetime'], Capacity=Capacity,
#     engin_email=data['End_datetime'])
#     try:
#         db.session.add(new_capacity)
#         db.session.commit()
#     except Exception as e:
#         return 'Result could not be added'
#     return 'Result has been recorded'


@app.route("/<string:Course_name>", methods=['POST'])
def create_class(Course_name):
    data = request.get_json()
    new_class = CLASSES(Course_name=Course_name, CNo=data['CNo'],
                        Start_datetime=data['Start_datetime'],
                        End_datetime=data['End_datetime'],
                        Capacity=data['Capacity'],
                        engin_email=data['End_datetime'])
    try:
        db.session.add(new_class)
        db.session.commit()
    except Exception as e:
        print(e)
        return 'Class could not be added'
    return 'Class has been recorded'


if __name__ == "__main__":

    app.run(host='0.0.0.0', port=5003, debug=True)
