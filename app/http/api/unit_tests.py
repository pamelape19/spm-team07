import unittest
from quiz import QUIZ

class TestQuiz(unittest.TestCase):
    def setUp(self):
        self.ShippingObj_SG_USA = ShippingMethodCalculator("Shawn",99998888)
        self.ShippingObj_SG_USA.setSizeWeight(10, 10)
        self.ShippingObj_SG_USA.setFromToCountry("SG", "USA")

        self.ShippingObj_INDIA_CHINA = ShippingMethodCalculator("Shawn",99998888)
        self.ShippingObj_INDIA_CHINA.setSizeWeight(10, 10)
        self.ShippingObj_INDIA_CHINA.setFromToCountry("INDIA", "CHINA")

    def teardown(self):
        self.landObj = None

    def test_getQuiz(self):
 

if __name__ == "__main__":
    unittest.main()