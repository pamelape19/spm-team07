from flask import Flask, jsonify

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
        return {"engin_email": self.engin_email, "engin_name": self.engin_name, "trainer": self.trainer}  # noqa: E501


@app.route("/")
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


@app.route("/<string:engin_email>")
def get_specific_engineer(engin_email):
    specific_engineer = ENGINEER.query.filter_by(engin_email=engin_email).first()  # noqa: E501
    if specific_engineer:
        return jsonify(
            { 
                "code": 200,
                "data": specific_engineer.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Engineer does not exist."
        }
    ), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5014, debug=True)
