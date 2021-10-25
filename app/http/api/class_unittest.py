import unittest
from classes import get_all_classes

# class: port 5003
# classNo, capacity, startDateTime, endDateTime

class TestClass(unittest.TestCase):
    def getAllClasses(self):
        self.retrieve = get_all_classes()

if __name__ == '__main__':
    unittest.main()