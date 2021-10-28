import unittest

from sqlalchemy.sql.expression import null
from classes import CLASSES
from classes import app
import json

# set our application to testing mode
app.testing = True
# class: port 5003

class TestClass(unittest.TestCase):
    def setUp(self):
        self.ClassInput = CLASSES (5, '2021-10-08', '2021-11-08', 40, 'SOP for Repair Work', 'boblee@allinone.com')
        self.app = app.test_client()

    def teardown(self):
        self.ClassInput = None
        
    def test_JSON(self):
        JsonInput = self.ClassInput.json()
        JsonCheck = {'CNo': 5, 'Start_datetime': '2021-10-08', 'End_datetime': '2021-11-08', 'Capacity': 40, 'Course_name': 'SOP for Repair Work', 'Trainer': 'boblee@allinone.com'}
        self.assertEqual(JsonCheck, JsonInput)

    def test_get_all_classes(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstCN = Data[0]["Course_name"]
        LastCN = Data[-1]["Course_name"]
        self.assertEqual("Introduction to Canon WorkCentre", FirstCN)
        self.assertEqual("SOP for Repair Work", LastCN)
    
    def test_get_startdatetime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstStartDateTime = Data[0]["Start_datetime"]
        self.assertEqual("Mon, 04 Oct 2021 10:30:00 GMT", FirstStartDateTime)
    
    def test_set_StartDateTime(self):
        Response = self.app.post("/1001", json= self.DataToParse)
        
        self.assertEqual(Response.status_code, 200)

        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['quiz_results']
        LastQuizResult = Data[-1]["score"]
        self.assertEqual(LastQuizResult, 3)

    def test_get_EndDateTime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstEndDateTime  = Data[0]["End_datetime"]
        self.assertEqual("Thu, 04 Nov 2021 12:00:00 GMT", FirstEndDateTime)

    # def setStartDateTime(self):
    
    def test_getCapacity(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstCapacity = Data[0]["Capacity"]
        self.assertEqual(40, FirstCapacity)

    # def setCapacity(self):

if __name__ == '__main__':
    unittest.main()