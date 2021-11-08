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


@app.route("/")
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

@app.route("/<int:quizID>")
def find_quiz_qn_by_quizID(quizID):
    quizQns = QUIZ_QUESTION.query.filter_by(quizID=quizID).all()
    if quizQns:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "quizQns": [quizQn.json() for quizQn in quizQns]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No quiz questions available for this quiz."
        }
    ), 404


@app.route("/<int:quizID>", methods=['POST'])
def add_question(quizID):
    data = request.json
    print(data)
    try:
        for qus in data["data"]:
            print(qus)
            new_quiz = QUIZ_QUESTION(question=qus["question"], questionNo=qus["question_no"], question_type=qus['question_type'], quizID=quizID )
            print(new_quiz)
            try:
                db.session.add(new_quiz)
                print('add')
                db.session.commit()
                print('commit')
            except Exception as e:
                print (e)

    except Exception as e:
        return 'Quiz could not be added'
    return 'Quiz has been added'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009, debug=True)

