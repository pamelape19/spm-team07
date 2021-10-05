import unittest   # The test framework
from __init__ import ENGINEER, COURSE, CLASS, ENROLLMENT
# class Test_TestIncrementDecrement(unittest.TestCase):
#     def test_increment(self):
#         self.assertEqual(4, 4)

#     def test_decrement(self):
#         self.assertEqual(3, 4)

class TestEngineer(unittest.TestCase):
    def test_to_dict(self):
        p1 = ENGINEER(engin_email='clara@allinone.com', engin_name='clara', trainer=False)
        self.assertEqual(p1.to_dict(),{
            'engin_email':'clara@allinone.com',
            'engin_name': 'clara',
            'trainer': False
        })

class TestCourse(unittest.TestCase):
    def test_to_dict(self):
        p1 = COURSE(course_name='Intro to 3D Printing', description='How to use 3D printer', objectives='Use a 3D Printer', prereq_name= '')
        self.assertEqual(p1.to_dict(),{
            'course_name':'Intro to 3D Printing',
            'description': 'How to use 3D printer',
            'objectives': 'Use a 3D Printer',
            'prereq_name': ''
        })
        # p2 = COURSE(course_name='Intro to Printing', description='How to use a printer', objectives='Use a Printer', prereq_name= 'Intro to AI')
        
    


        



if __name__ == '__main__':
    unittest.main()