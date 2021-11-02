from flask import Flask, jsonify

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


@app.route("/")
def get_all_chapter():
    chapterlist = CHAPTER.query.all()
    if len(chapterlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "chapter": [chapter.json() for chapter in chapterlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no chapter."
        }
    ), 404

@app.route("/<string:course_name>/<int:CNo>/<int:chapterNo>/<string:chapter_name>", methods=['POST'])
def update_chapter(course_name, CNo, chapterNo, chapter_name):
    chapter = CHAPTER.query.filter_by(course_name=course_name, CNo=CNo).first()
    if (chapter):
        new_chapter = CHAPTER(chapterNo=chapterNo, chapter_name=chapter_name, CNo=CNo, course_name=course_name)
        try:
            db.session.add(new_chapter)
            print('add')
            db.session.commit()
            print('commit')
        except Exception as e:
            print(e)
            return 'Chapter could not be added'
        return 'Chapter has been added'
    else:
        try:
            chapter.chapter_name = chapter_name
            db.session.commit()
        except Exception as e:
            print(e)
            return 'Chapter name could not be updated'
        return 'Chapter name has been updated'
        

    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, debug=True)