import os
from typing import Coroutine
from flask import Flask, request, jsonify, send_file
from io import BytesIO
import enum

from flask.helpers import flash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy import func

from datetime import datetime

from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'dbURL') or 'mysql+mysqlconnector://root@localhost:3306/lms'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class COURSE_MATERIAL(db.Model):
    material_id = db.Column(db.Integer, primary_key=True, nullable=False)
    material_name  = db.Column(db.String(300), nullable=False)
    content = db.Column(db.LargeBinary, nullable=False)
    CNo = db.Column(db.Integer, nullable=False)
    Course_name = db.Column(db.String(300), nullable=False)
    Chapter_num = db.Column(db.Integer, nullable=False)

    def __init__(self, material_id, material_name,  content, CNo, Course_name, Chapter_num):
        self.material_id = material_id
        self.material_name = material_name
        self.content = content
        self.CNo = CNo
        self.Course_name = Course_name
        self.chapter_num = Chapter_num

@app.route('/<string:courseName>/<int:cNo>', methods=['POST'])
def uploadCourseMaterial(courseName, cNo):
    if 'file' in request.files:
        file = request.files['file']
        print(file.filename)
        file_count = db.session.query(COURSE_MATERIAL).count()
        new_mid = file_count + 1
        new_file = COURSE_MATERIAL(material_id=new_mid, material_name=file.filename, content=file.read(), CNo=cNo, Course_name=courseName, Chapter_num=0)
        try:
            db.session.add(new_file)
            db.session.commit()
        except Exception as e:
            return 'File could not be uploaded'
        return 'File is uploaded'

@app.route('/<string:courseName>/<int:cNo>/<int:chapterNum>', methods=['POST'])
def uploadLectureMaterial(courseName, cNo, chapterNum):
    if 'file' in request.files:
        file = request.files['file']
        print(file.filename)
        file_count = db.session.query(COURSE_MATERIAL).count()
        new_mid = file_count + 1
        new_file = COURSE_MATERIAL(material_id=new_mid, material_name=file.filename, content=file.read(), CNo=cNo, Course_name=courseName, Chapter_num=chapterNum)
        try:
            db.session.add(new_file)
            db.session.commit()
        except Exception as e:
            return 'File could not be uploaded'
        return 'File is uploaded'

@app.route('/download/<string:courseName>/<int:cNo>')
def downloadCourseMaterial(courseName, cNo):
    file_data = COURSE_MATERIAL.query.filter_by(Course_name=courseName, CNo=cNo, Chapter_num=0).first()
    file_name = file_data.material_name + '.pdf'
    return send_file(BytesIO(file_data.content), attachment_filename=file_name, as_attachment=True)

@app.route('/download/<string:courseName>/<int:cNo>/<int:chapterNum>')
def downloadLectureMaterial(courseName, cNo, chapterNum):
    file_data = COURSE_MATERIAL.query.filter_by(Course_name=courseName, CNo=cNo, Chapter_num=chapterNum).first()
    file_name = file_data.material_name + '.pdf'
    return send_file(BytesIO(file_data.content), attachment_filename=file_name, as_attachment=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5007, debug=True)

