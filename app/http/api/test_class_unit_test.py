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
        JsonCheck = {'CNo': 5, 'Start_date': '2021-10-08', 'End_date': '2021-11-08', 'Capacity': 40, 'Course_name': 'SOP for Repair Work', 'Trainer': 'boblee@allinone.com'}
        self.assertEqual(JsonCheck, JsonInput)

    def test_get_all_classes(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstData = Data[0]["Course_name"]
        LastData = Data[-1]["Course_name"]
        # self.assertEqual(Response.status_code, 200)
        self.assertEqual("Introduction to Canon WorkCentre", FirstData)
        self.assertEqual("SOP for Repair Work", LastData)

if __name__ == '__main__':
    unittest.main()