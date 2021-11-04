import unittest

from sqlalchemy.sql.expression import null
from hr import HR
from hr import app
import json 
# set our application to testing mode
app.testing = True

class TestHR(unittest.TestCase):
    def setUp(self):
        self.HRInput = HR("davetan@allinone.com", "Dave")
        self.app = app.test_client()

    def teardown(self):
        self.HRInput = None

    def test_JSON(self):
        JsonInput = self.HRInput.json()
        JsonCheck = {"hr_email": "davetan@allinone.com", "hr_name": "Dave"}
        self.assertEqual(JsonCheck,JsonInput)

    def test_get_all_HR(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())["data"]["engineers"]
        FirstHREmail = Data[0]["hr_email"]
        LastHREmail = Data[-1]["hr_email"]

        self.assertEqual(Response.status_code, 200)
        self.assertEqual("davetan@allinone.com", FirstHREmail)
        self.assertEqual("miturria@allinone.com", LastHREmail)      


if __name__ == "__main__":
    unittest.main()