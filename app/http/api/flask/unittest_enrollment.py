import unittest

from sqlalchemy.sql.expression import null
from enrollment import ENROLLMENT
from enrollment import app
import json 

# Done by: Lyndy Koo

app.testing = True

class TestEnrollment(unittest.TestCase):
    def setUp(self):
        self.EnrollmentInputBefore = ENROLLMENT("malcolmlim@allinone.com",1,"SOP for Repair Work",0,0,0)
        self.EnrollmentInputAfter = ENROLLMENT("malcolmlim@allinone.com",1,"SOP for Repair Work",0,1,0)
        self.app = app.test_client()

    def teardown(self):
        self.EnrollmentInputBefore = None
        self.EnrollmentInputAfter = None

    def test_JSON(self):
        JsonInput = self.EnrollmentInputBefore.json()
        JsonCheck = {"engin_email": "malcolmlim@allinone.com", "CNo": 1, "Course_name": "SOP for Repair Work", "assigned": 0, "enrolled": 0, "completed": 0}
        self.assertEqual(JsonCheck,JsonInput)

        JsonInput = self.EnrollmentInputAfter.json()
        JsonCheck = {"engin_email": "malcolmlim@allinone.com", "CNo": 1, "Course_name": "SOP for Repair Work", "assigned": 0, "enrolled": 1, "completed": 0}
        self.assertEqual(JsonCheck,JsonInput)

    def test_update_delete_enrollment(self):
        Response = self.app.get("/manage-applications")
        Data = json.loads(Response.get_data())["data"]["pending"]
        self.assertEqual(Response.status_code, 200) #check any "0" for enrolled
        
        updateResponse = self.app.put("/update-enrollment/malcolmlim@allinone.com/SOP for Repair Work/1")
        self.assertEqual(updateResponse.get_data(), b"Learner's application was updated.") #update one enrolled record from "0" to "1"

        deleteResponse = self.app.delete("/delete-enrollment/malcolmlim@allinone.com/Introduction to IBM WorkCentre/3")
        self.assertEqual(deleteResponse.get_data(), b"Learner's application was deleted.") #delete record that is enrolled "0"
        
        Response1 = self.app.get("/manage-applications")
        self.assertEqual(Response1.status_code, 404) #check no "0" for enrolled

if __name__ == "__main__":
    unittest.main()