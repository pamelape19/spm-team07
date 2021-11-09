# Clara Lee
# 01399737

import unittest

from sqlalchemy.sql.expression import null
from course import COURSE
from course import app
import json 
import unittest
# set our application to testing mode
app.testing = True

class TestCourse(unittest.TestCase):
    def setUp(self):
        self.CourseInput = COURSE("Introduction to HP WorkCentre", "The fundamentals of the workcentre at HP", "For all the engineers to have a basic understanding of the products and solutions of HP", "Introduction to IBM WorkCentre")
        self.app = app.test_client() 

    def teardown(self):
        self.CourseInput = None

    def test_JSON(self):
        JsonInput = self.CourseInput.json()
        JsonCheck = {'course_name': "Introduction to HP WorkCentre", 'description': 'The fundamentals of the workcentre at HP', 'objectives': 'For all the engineers to have a basic understanding of the products and solutions of HP', 'prereq_name' : 'Introduction to IBM WorkCentre'}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_courses(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['courses']
        DataLength = len(Data)
        self.assertEqual(Response.status_code, 200)
        self.assertEqual(5, DataLength)

    def test_get_specific_course(self):
        Response = self.app.get("/Introduction to HP WorkCentre")
        Data = json.loads(Response.get_data())['data']
        DataLength = len(Data)
        self.assertEqual(Response.status_code, 200)
        self.assertEqual(4, DataLength)

    def test_get_specific_course(self):
        Response = self.app.get("/Introduction to HP WorkCentre")
        Data = json.loads(Response.get_data())['data']
        DataLength = len(Data)
        self.assertEqual(Response.status_code, 200)
        self.assertEqual(4, DataLength)
        
    def test_get_course_description(self):
        Response = self.app.get("/Introduction to HP WorkCentre")
        Data = json.loads(Response.get_data())['data']["description"]
        self.assertEqual(Response.status_code, 200)
        self.assertEqual("The fundamentals of the workcentre at HP", Data)
        
        
if __name__ == "__main__":
    unittest.main()