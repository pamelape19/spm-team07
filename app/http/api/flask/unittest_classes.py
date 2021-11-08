# Pamela Pe
# 01383595

import unittest

from sqlalchemy.sql.expression import null
from classes import CLASSES
from classes import app

import json

# set our application to testing mode
app.testing = True

class TestClass(unittest.TestCase):
    def setUp(self):
        self.ClassInput = CLASSES(5, '2021-10-08', '2021-11-08', 40, 'SOP for Repair Work', 'boblee@allinone.com')
        self.DataToParse = {'CNo': 6, 'Start_datetime': '2021-12-08 10:30:00', 'End_datetime': '2022-02-08 10:30:00', 'Capacity': 88, 'Course_name': 'Introduction to Canon WorkCentre', 'engin_email': 'boblee@allinone.com'}
        self.app = app.test_client()

    def teardown(self):
        self.ClassInput = None
        
    def test_JSON(self):
        JsonInput = self.ClassInput.json()
        JsonCheck = {'CNo': 5, 'Start_datetime': '2021-10-08', 'End_datetime': '2021-11-08', 'Capacity': 40, 'Course_name': 'SOP for Repair Work', 'engin_email': 'boblee@allinone.com'}
        self.assertEqual(JsonCheck, JsonInput)

    # Post new class
    def test_create_class(self):
        Response = self.app.post("/Introduction to Canon WorkCentre",
                                    json=self.DataToParse)
        self.assertEqual(Response.status_code, 200)
        
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']

        newCNo = Data[-1]["CNo"]
        newCourse = Data[-1]["Course_name"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual(newCNo, 6)
        self.assertEqual(newCourse, "Introduction to Canon WorkCentre")

    # Check number of classes is 26
    def test_get_all_classes(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        
        DataLength = len(Data)
        self.assertEqual(Response.status_code, 200)
        self.assertEqual(26, DataLength)

    # Get first class details - cno and course name
    def test_get_specific_class(self):
        Response = self.app.get("/Introduction to Canon WorkCentre")
        Data = json.loads(Response.get_data())['data']["classes"]
        
        FirstCourseName =  Data[0]["Course_name"]
        FirstCNo = Data[0]["CNo"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("Introduction to Canon WorkCentre", FirstCourseName)
        self.assertEqual(1, FirstCNo)
    
    # Get engin_email from second class
    def test_get_trainer_class(self):
        Response = self.app.get("/Introduction to HP WorkCentre")
        Data = json.loads(Response.get_data())['data']["classes"]

        SecondEnginEmail =  Data[1]["engin_email"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("alexlim@allinone.com", SecondEnginEmail)

    # Get first class start_datetime
    def test_get_startdatetime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        
        FirstStartDateTime = Data[0]["Start_datetime"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("Mon, 04 Oct 2021 10:30:00 GMT", FirstStartDateTime)

    # Get last class end_datetime
    def test_get_enddatetime(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        
        FirstStartDateTime = Data[-1]["End_datetime"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("Tue, 08 Feb 2022 10:30:00 GMT", FirstStartDateTime)

    # Get first class capacity
    def test_getCapacity(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstCapacity = Data[0]["Capacity"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual(40, FirstCapacity)
    
if __name__ == "__main__":
    unittest.main()
