# G Shaamini
# 01393074

import unittest

from sqlalchemy.sql.expression import null
from engineer import ENGINEER
from engineer import app
import json 
import unittest

app.testing = True

class TestEngineer(unittest.TestCase):
    def setUp(self):
        self.EngineerInput = ENGINEER("jason@allinone.com", "Jason", 0)
        self.app = app.test_client()

    def teardown(self):
        self.EngineerInput = None

    def test_JSON(self):
        JsonInput = self.EngineerInput.json()
        JsonCheck = {'engin_email': 'jason@allinone.com', 'engin_name': 'Jason', 'trainer': 0}
        self.assertEqual(JsonCheck,JsonInput)
        
    def test_get_all_engineers(self):
        Response = self.app.get("/")
        Data = json.loads(Response.get_data())['data']['engineers']
        FirstEngineerEmail = Data[0]["engin_email"]
        LastEngineerEmail = Data[-1]["engin_email"]
        NumberofEngineers = len(Data)
        num_trainers = 0
        for engin in Data:
            if engin["trainer"] == 1:
                num_trainers += 1

        self.assertEqual(Response.status_code, 200)
        self.assertEqual(11, NumberofEngineers)
        self.assertEqual("alexlim@allinone.com", FirstEngineerEmail)
        self.assertEqual("samueltan@allinone.com", LastEngineerEmail) 
        self.assertEqual(9,num_trainers)  


if __name__ == "__main__":
    unittest.main()