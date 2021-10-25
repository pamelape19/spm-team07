import unittest

from sqlalchemy.sql.expression import null
from classes import CLASSES
from classes import app
import json

# set our application to testing mode
app.testing = True
# class: port 5003
# classNo, capacity, startDateTime, endDateTime

class TestClass(unittest.TestCase):
    def setUp(self):
        self.ClassInput = CLASSES (1,'2021-10-04','2021-11-04', 40, 'Introduction to IBM WorkCentre', 'alexlim@allinone.com')
        self.app = app.test_client()

    def teardown(self):
        self.ClassInput = None
        
    def test_JSON(self):
        JsonInput = self.ClassInput.json()
        JsonCheck = {'CNo': 1, 'Start_date': '2021-10-04', 'End_date': '2021-11-04', 'Capacity': 40, 'Course_name': 'Introduction to IBM WorkCentre', 'Trainer': 'alexlim@allinone.com'}
        self.assertEqual(JsonCheck, JsonInput)

    def test_get_all_classes(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstData = Data[0]["CNo"]
        # LastData = Data[4]["Course_name"]
        # self.assertEqual(Response.status_code, 200)
        self.assertEqual("1", FirstData)
        # self.assertEqual("Introduction to IBM WorkCentre", LastData)

if __name__ == '__main__':
    unittest.main()