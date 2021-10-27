from create_course import CREATE_COURSE, db, app
from course import COURSE
from classes import CLASSES

class CourseController:
    def create_course(self, course_name, hr_email, date_created):
        self._course = COURSE(course_name)
        self._admin = CREATE_COURSE(hr_email)
        self._date = CREATE_COURSE(date_created)

    
