import unittest

from sqlalchemy.sql.expression import null
from quiz_results import QUIZ_RESULTS
from quiz_results import app
import json 
import unittest
# set our application to testing mode
# Shawn
app.testing = True

class TestQuizResults(unittest.TestCase):

    def setUp(self):
        self.QuizResultInput = QUIZ_RESULTS(1, 2, True, "samueltan@allinone.com", "1001", 5)
        self.DataToParse =  {'attemptNo': 3, 'result': 1, 'outcome': True, 'enginEmail': 'samueltan@allinone.com', 'totalqns': 5}
        self.app = app.test_client()

    def teardown(self):
        self.QuizInput = None

    def test_JSON(self):
        JsonInput = self.QuizResultInput.json()
        JsonCheck = {'attemptNo': 1, 'score': 2, 'outcome': True, 'engin_email': 'samueltan@allinone.com', 'quizID': '1001', 'total_qns': 5}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_quiz(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['quiz_results']
        # NumberofResults = len(Data)
        # FirstQuizResult = Data[0]["score"]
        # LastQuizResult = Data[-1]["score"]
        self.assertEqual(Response.status_code, 200)

    def test_post_quiz_result(self):
        Response = self.app.post("/1002", json = self.DataToParse)
        print(Response.get_data())
        self.assertEqual(Response.status_code, 200)

        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['quiz_results']

        LastQuizResult = Data[-1]["score"]
        self.assertEqual(LastQuizResult, 1)

if __name__ == "__main__":
    unittest.main()