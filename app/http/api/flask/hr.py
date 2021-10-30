from flask import Flask, jsonify

from flask.helpers import flash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'dbURL')or 'mysql+mysqlconnector://root@localhost:3306/lms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class HR (db.Model):
    __tablename__ = 'HR'
    hr_email  = db.Column(db.String(50), primary_key=True)
    hr_name  = db.Column(db.String(60), nullable=False)

    def __init__(self, hr_email, hr_name):
        self.hr_email = hr_email
        self.hr_name = hr_name

    def json(self):
        return {"hr_email": self.hr_email, "hr_name": self.hr_name}


@app.route("/")
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)