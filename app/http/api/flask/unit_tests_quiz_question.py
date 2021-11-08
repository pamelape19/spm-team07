# Shawn
# 01389218
import unittest

from sqlalchemy.sql.expression import null
from quiz_question import QUIZ_QUESTION
from quiz_question import app
import json 
import unittest
# set our application to testing mode
app.testing = True

class TestQuizQuestion(unittest.TestCase):
    def setUp(self):
        self.QuizInput = QUIZ_QUESTION("testing question", 1, "mcq", "1001")
        self.app = app.test_client()

    def teardown(self):
        self.QuizInput = None

    def test_JSON(self):
        JsonInput = self.QuizInput.json()
        JsonCheck = {'question': 'testing question', 'questionNo': 1, 'question_type': 'mcq', 'quizID': '1001'}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_quiz(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['quiz_question']
        FirstQuestionQuizID = Data[0]["quizID"]
        LastQuestionQuizID = Data[-1]["quizID"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("1001", FirstQuestionQuizID)
        self.assertEqual("3201", LastQuestionQuizID)      
 
    def test_get_specific_quiz(self):
        Response = self.app.get("/1001")
        Data = json.loads(Response.get_data())['data']["quizQns"]
        FirstQuestionQuizID =  Data[0]["quizID"]
        LastQuestionQuizID = Data[-1]["quizID"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("1001", FirstQuestionQuizID)
        self.assertEqual("1001", LastQuestionQuizID)

if __name__ == "__main__":
    unittest.main()