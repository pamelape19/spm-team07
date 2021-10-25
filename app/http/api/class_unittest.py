import unittest
from classes import CLASSES

# class: port 5003
# classNo, capacity, startDateTime, endDateTime

class TestClass(unittest.TestCase):
    def test_getAllClasses(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_getSpecificClass(self):
        self.assertEqual('Introduction to IBM WorkCentre', '1')

if __name__ == '__main__':
    unittest.main()