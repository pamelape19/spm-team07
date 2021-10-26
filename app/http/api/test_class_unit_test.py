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
        self.ClassInput = CLASSES (5, '2021-10-08 18:30:00', '2021-11-08 20:00:00', 40, 'SOP for Repair Work', 'boblee@allinone.com')
        self.app = app.test_client()

    def teardown(self):
        self.ClassInput = None
        
    def test_JSON(self):
        JsonInput = self.ClassInput.json()
        JsonCheck = {'CNo': 5, 'Start_datetime': '2021-10-08 18:30:00', 'End_datetime': '2021-11-08 20:00:00', 'Capacity': 40, 'Course_name': 'SOP for Repair Work', 'Trainer': 'boblee@allinone.com'}
        self.assertEqual(JsonCheck, JsonInput)

    def test_get_all_classes(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstCN = Data[0]["Course_name"]
        LastCN = Data[-1]["Course_name"]
        self.assertEqual("Introduction to Canon WorkCentre", FirstCN)
        self.assertEqual("SOP for Repair Work", LastCN)
    
    def getStartDateTime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstStartDateTime = Data[0]["Start_datetime"]
        self.assertEqual("2021-10-04 10:30:00", FirstStartDateTime)
    
    # def setStartDateTime(self):

    def getEndDateTime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstEndDateTime  = Data[0]["End_datetime"]
        self.assertEqual("2021-11-04 12:00:00",  FirstEndDateTime)

    # def setStartDateTime(self):
    
    # def getCapacity(self):
    def getEndDateTime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        LastCapacity = Data[-1]["Capacity"]
        self.assertEqual("2021-11-04 12:00:00", LastCapacity)

    # def setCapacity(self):

if __name__ == '__main__':
    unittest.main()