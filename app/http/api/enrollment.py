from flask import Flask, request, jsonify

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


class ENROLLMENT (db.Model):
    __tablename__ = 'ENROLLMENT'
    engin_email = db.Column(db.String(50), primary_key=True)
    CNo = db.Column(db.Integer, nullable=False, primary_key=True)
    Course_name = db.Column(db.String(100), nullable=False, primary_key=True)
    assigned = db.Column(db.Boolean, nullable=False)
    enrolled = db.Column(db.Boolean, nullable=False)

    def __init__(self, engin_email, CNo, Course_name, assigned, enrolled):
        self.engin_email = engin_email
        self.CNo = CNo
        self.Course_name = Course_name
        self.assigned = assigned
        self.enrolled = enrolled

    def json(self):
        return {"engin_email": self.engin_email, "CNo": self.CNo, "Course_name": self.Course_name, "assigned": self.assigned, "enrolled": self.enrolled}


@app.route("/")
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

@app.route("/<string:engin_email>")
def find_enrollment_by_engin_email(engin_email):
    enrolled_engins = ENROLLMENT.query.filter_by(engin_email=engin_email).all()
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

@app.route("/<string:courseName>/<int:classNum>", methods=['POST'])
def addToEnrollmentTable(courseName, classNum):
    data = request.get_json()
    new_row = ENROLLMENT(engin_email=data['enginEmail'], CNo=classNum, Course_name=courseName, assigned=1, enrolled=0)
    try:
        db.session.add(new_row)
        db.session.commit()
    except Exception as e:
        print(e)
        return "Learner's application was not successful."
    return "Learner's application was successful."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)