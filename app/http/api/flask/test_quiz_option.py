import unittest

from sqlalchemy.sql.expression import null
from quiz_option import QUIZ_OPTION
from quiz_option import app
import json 
import unittest
# set our application to testing mode
# Shawn
app.testing = True

class TestQuizOption(unittest.TestCase):
    def setUp(self):
        self.QuizInput = QUIZ_OPTION(1, "testing", "1001", 1, 1, 1)
        self.app = app.test_client()

    def teardown(self):
        self.QuizInput = None

    def test_JSON(self): 
        JsonInput = self.QuizInput.json()
        JsonCheck = {'optionNo': 1, 'option_value': 'testing', 'quizID': '1001', 'questionNo': 1, 'selected': 1, 'answer': 1}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_quiz_option(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['quiz_option']
        DataLength = len(Data)
        self.assertEqual(Response.status_code, 200)
        self.assertEqual(116, DataLength)

    def test_get_specific_quiz_option(self):
        Response = self.app.get("/1001")
        Data = json.loads(Response.get_data())['data']['quizOptions']
        DataLength = len(Data)
        self.assertEqual(Response.status_code, 200)
        self.assertEqual(14, DataLength)



if __name__ == "__main__":
    unittest.main()