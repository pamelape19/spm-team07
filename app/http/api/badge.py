from flask import Flask, request, jsonify

from flask.helpers import flash
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


class BADGE (db.Model):
    __tablename__ = 'BADGE'
    date_completed   = db.Column(db.DateTime, nullable=False)
    engin_email   = db.Column(db.String(50), nullable=False, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False, primary_key=True)
    class_num = db.Column(db.Integer, nullable=False)


    def __init__(self, date_completed, engin_email, course_name, class_num):
        self.date_completed = date_completed
        self.engin_email = engin_email
        self.course_name = course_name
        self.class_num = class_num

    def json(self):
        return {"date_completed": self.date_completed, "engin_email": self.engin_email, "course_name": self.course_name, "class_num": self.class_num}


@app.route("/")
def get_all_badge():
    badgelist = BADGE.query.all()
    if len(badgelist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "completed": [badge.json() for badge in badgelist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no badge."
        }
    ), 404

@app.route("/<string:engin_email>")
def get_completed_classes(engin_email):
    completedClassesList = BADGE.query.filter_by(engin_email=engin_email).all()
    if len(completedClassesList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "completedClasses": [completedClass.json() for completedClass in completedClassesList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No completed classes by this engineer."
        }
    ), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)