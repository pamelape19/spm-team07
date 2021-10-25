import unittest

from sqlalchemy.sql.expression import null
from classes import CLASSES
from classes import app
import json
app.testing = True

# class: port 5003
# classNo, capacity, startDateTime, endDateTime

class TestClass(unittest.TestCase):
    def setUp(self):
        self.ClassInput = CLASSES('1','2021-10-04 15:30:00','2021-11-04 17:00:00','40', 'Introduction to IBM WorkCentre', 'alexlim@allinone.com')
        self.app = app.test_client()

    def teardown(self):
        self.ClassInput = None
        
    def test_JSON(self):
        JsonInput = self.ClassInput.json()
        JsonCheck = {'CNo': 1, 'Start_datetime': '2021-10-04 15:30:00', 'End_datetime': '2021-11-04 17:00:00', 'Capacity': 40, 'Course_name': 'Introduction to IBM WorkCentre', 'engin_email': 'alexlim@allinone.com'}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_classes(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['classes']
        FirstData = Data[0]["CNo"]
        LastData = Data[-1]["Course_name"]
        self.assertEqual("1001", FirstData)
        self.assertEqual("3201", LastData)  

    #def test_get_specific_class(self):
        #self.assertEqual('Introduction to IBM WorkCentre', '1')

if __name__ == '__main__':
    unittest.main()