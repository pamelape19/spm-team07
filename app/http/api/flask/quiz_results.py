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


class QUIZ_RESULTS (db.Model):
    __tablename__ = 'QUIZ_RESULTS'
    attemptNo = db.Column(db.Integer, nullable=False, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    outcome = db.Column(db.Boolean, nullable=False)
    engin_email = db.Column(db.String(50), nullable=False, primary_key=True)
    quizID = db.Column(db.String(50), nullable=False, primary_key=True)
    total_questions = db.Column(db.Integer, nullable=False)

    def __init__(self, attemptNo, score, outcome,
                 engin_email, quizID, total_questions):
        self.attemptNo = attemptNo
        self.score = score
        self.outcome = outcome
        self.engin_email = engin_email
        self.quizID = quizID
        self.total_questions = total_questions

    def json(self):
        return {"attemptNo": self.attemptNo,
                "score": self.score,
                "outcome": self.outcome,
                "engin_email": self.engin_email,
                "quizID": self.quizID,
                "total_qns": self.total_questions}


@app.route("/")
def get_all_quiz_results():
    quiz_results_list = QUIZ_RESULTS.query.all()
    if len(quiz_results_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quiz_results": [quiz_results.json() for quiz_results in quiz_results_list]  # noqa: E501
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no quiz_results."
        }
    ), 404


@app.route("/<string:quizId>", methods=['POST'])
def addNewResult(quizId):
    data = request.get_json()
    attempt_engin = db.session.query(QUIZ_RESULTS).filter(QUIZ_RESULTS.engin_email == data['enginEmail'])  # noqa: E501
    attempt_count = attempt_engin.count()
    new_result = QUIZ_RESULTS(attemptNo=attempt_count,
                              score=data['result'],
                              outcome=data['outcome'],
                              engin_email=data['enginEmail'],
                              quizID=quizId,
                              total_questions=data['totalqns'])
    print(new_result)
    try:
        db.session.add(new_result)
        db.session.commit()
    except Exception as e:
        print(e)
        return 'Result could not be added'
    return 'Result has been recorded'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)
