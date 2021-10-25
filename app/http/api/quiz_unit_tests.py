import unittest

from sqlalchemy.sql.expression import null
from quiz import QUIZ
from quiz import app
import json 
import unittest
# set our application to testing mode
app.testing = True

class TestQuiz(unittest.TestCase):
    def setUp(self):
        self.QuizInput = QUIZ(1001, 1, "Introduction to IBM WorkCentre", "Introduction", null, 1)
        self.app = app.test_client()

    def teardown(self):
        self.QuizInput = None

    def test_JSON(self):
        JsonInput = self.QuizInput.json()
        JsonCheck = {'quizID': 1001, 'CNo': 1, 'course_name': 'Introduction to IBM WorkCentre', 'chapter_name': 'Introduction', 'duration': null, 'total_questions': 1}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_quiz(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['quiz']
        FirstQuizID = Data[0]["quizID"]
        LastQuizID = Data[-1]["quizID"]
        NumberofQuiz = len(Data)
        self.assertEqual(24, NumberofQuiz)
        self.assertEqual("1001", FirstQuizID)
        self.assertEqual("3201", LastQuizID)      

    def test_get_specific_quiz(self):
        Response = self.app.get("/Introduction to IBM WorkCentre/1")
        Data = json.loads(Response.get_data())['data']["courseQuizzes"]

        CNo = Data[0]["CNo"]
        CourseName = Data[0]["course_name"]
        SpecificQuizID =  Data[0]["quizID"]
        self.assertEqual(2, CNo)
        self.assertEqual("Introduction to IBM WorkCentre",CourseName)
        self.assertEqual("1002", SpecificQuizID)
    # def test_get_certain_quiz(self):


if __name__ == "__main__":
    unittest.main()