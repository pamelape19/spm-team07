drop database if exists LMS;
create database LMS;
use LMS;
CREATE TABLE ENGINEER
(
  engin_email VARCHAR(50) NOT NULL,
  engin_name VARCHAR(60) NOT NULL,
  trainer TINYINT(1) NOT NULL,
  CONSTRAINT ENGINEER_pk PRIMARY KEY (engin_email)
);

CREATE TABLE HR
(
  hr_email VARCHAR(50) NOT NULL,
  hr_name VARCHAR(60) NOT NULL,
  CONSTRAINT HR_pk PRIMARY KEY (hr_email)
);

CREATE TABLE COURSE
(
  Course_name VARCHAR(200) NOT NULL,
  Description VARCHAR(700) NOT NULL,
  Objectives VARCHAR(700) NOT NULL,
  Prereq_name VARCHAR(200),
  CONSTRAINT COURSE_pk PRIMARY KEY (Course_name),
  CONSTRAINT COURSE_fk1 FOREIGN KEY (Prereq_name) REFERENCES COURSE(Course_name)
);

CREATE TABLE CLASS
(
  CNo INT NOT NULL,
  Start_datetime TIMESTAMP NOT NULL,
  End_datetime TIMESTAMP NOT NULL,
  Capacity INT NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  engin_email VARCHAR(50) NOT NULL,
  CONSTRAINT CLASS_pk PRIMARY KEY (CNo, Course_name),
  CONSTRAINT CLASS_fk1 FOREIGN KEY (Course_name) REFERENCES COURSE(Course_name),
  CONSTRAINT CLASS_fk2 FOREIGN KEY (engin_email) REFERENCES ENGINEER(engin_email)
);

CREATE TABLE ENROLLMENT
(
  engin_email VARCHAR(50) NOT NULL,
  CNo INT NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  assigned TINYINT(1) NOT NULL,
  enrolled TINYINT(1) NOT NULL,
  CONSTRAINT ENROLLMENT_pk PRIMARY KEY (engin_email, CNo, Course_name),
  CONSTRAINT ENROLLMENT_fk1 FOREIGN KEY (engin_email) REFERENCES ENGINEER(engin_email),
  CONSTRAINT ENROLLMENT_fk2 FOREIGN KEY (CNo, Course_name) REFERENCES CLASS(CNo, Course_name)
);

CREATE TABLE TRAIN
(
  engin_email VARCHAR(50) NOT NULL,
  CNo INT NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  CONSTRAINT TRAIN_pk PRIMARY KEY (engin_email, CNo, Course_name),
  CONSTRAINT TRAIN_fk1 FOREIGN KEY (engin_email) REFERENCES ENGINEER(engin_email),
  CONSTRAINT TRAIN_fk2 FOREIGN KEY (CNo, Course_name) REFERENCES CLASS(CNo, Course_name)
);


CREATE TABLE CHAPTER
(
  ChapterNo INT NOT NULL,
  Chapter_name VARCHAR(200) NOT NULL,
  CNo INT NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  CONSTRAINT CHAPTER_pk PRIMARY KEY (Chapter_name, CNo, Course_name),
  CONSTRAINT CHAPTER_fk1 FOREIGN KEY (CNo, Course_name) REFERENCES CLASS(CNo, Course_name)
);

CREATE TABLE COURSE_MATERIAL
(
  material_name VARCHAR(200) NOT NULL,
  content MEDIUMBLOB NOT NULL,
  material_id INT NOT NULL AUTO_INCREMENT,
  CNo INT NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  Chapter_num INT NOT NULL,
  file_extension VARCHAR(10) NOT NULL,
  CONSTRAINT COURSE_MATERIAL_pk PRIMARY KEY (material_id),
  CONSTRAINT COURSE_MATERIAL_fk1 FOREIGN KEY (CNo, Course_name) REFERENCES CLASS(CNo, Course_name)
);

CREATE TABLE QUIZ
(
  QuizID VARCHAR(50) NOT NULL,
  CNo INT NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  Chapter_name VARCHAR(200),
  Duration INT,
  Total_Questions INT,
  CONSTRAINT QUIZ_pk PRIMARY KEY (QuizID),
  CONSTRAINT QUIZ_fk1 FOREIGN KEY (CNo, Course_name) REFERENCES CLASS(CNo, Course_name),
  CONSTRAINT QUIZ_fk2 FOREIGN KEY (Chapter_name) REFERENCES CHAPTER(Chapter_name)
);


CREATE TABLE QUIZ_QUESTION
(
  Question VARCHAR(1000) NOT NULL,
  QuestionNo INT NOT NULL,
  Question_type ENUM('mcq', 't/f') NOT NULL,
  QuizID VARCHAR(50) NOT NULL,
  CONSTRAINT QUIZ_QUESTION_pk PRIMARY KEY (QuestionNo, QuizID),
  CONSTRAINT QUIZ_QUESTION_fk1 FOREIGN KEY (QuizID) REFERENCES QUIZ(QuizID)
);

CREATE TABLE QUIZ_RESULTS
(
  AttemptNo INT NOT NULL,
  Score INT NOT NULL,
  Outcome TINYINT(1) NOT NULL,
  engin_email VARCHAR(50) NOT NULL,
  QuizID VARCHAR(50) NOT NULL,
  Total_Questions INT NOT NULL,
  CONSTRAINT QUIZ_RESULTS_pk PRIMARY KEY (AttemptNo, engin_email, QuizID),
  CONSTRAINT QUIZ_RESULTS_fk1 FOREIGN KEY (engin_email) REFERENCES ENGINEER(engin_email),
  CONSTRAINT QUIZ_RESULTS_fk2 FOREIGN KEY (QuizID) REFERENCES QUIZ(QuizID)
);

CREATE TABLE CREATE_COURSE
(
  date_created DATE NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  hr_email VARCHAR(50) NOT NULL,
  CONSTRAINT CREATE_COURSE_pk PRIMARY KEY (Course_name, hr_email),
  CONSTRAINT CREATE_COURSE_fk1 FOREIGN KEY (Course_name) REFERENCES COURSE(Course_name),
  CONSTRAINT CREATE_COURSE_fk2 FOREIGN KEY (hr_email) REFERENCES HR(hr_email)
);

CREATE TABLE BADGE
(
  date_completed DATE NOT NULL,
  engin_email VARCHAR(50) NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  class_num INT NOT NULL,
  CONSTRAINT BADGE_pk PRIMARY KEY (engin_email, Course_name),
  CONSTRAINT BADGE_fk1 FOREIGN KEY (engin_email) REFERENCES ENGINEER(engin_email),
  CONSTRAINT BADGE_fk2 FOREIGN KEY (Course_name) REFERENCES COURSE(Course_name)
);

CREATE TABLE FORUMPOST
(
  Content VARCHAR(500) NOT NULL,
  QuestionCategory VARCHAR(100) NOT NULL,
  Topic VARCHAR(100) NOT NULL,
  Date_posted DATE NOT NULL,
  Resolved TINYINT(1) NOT NULL,
  Course_name VARCHAR(200) NOT NULL,
  engin_email VARCHAR(50) NOT NULL,
  CONSTRAINT FORUMPOST_pk PRIMARY KEY (Content, Course_name, engin_email),
  CONSTRAINT FORUMPOST_fk1 FOREIGN KEY (Course_name) REFERENCES COURSE(Course_name),
  CONSTRAINT FORUMPOST_fk2 FOREIGN KEY (engin_email) REFERENCES ENGINEER(engin_email)
);

CREATE TABLE QUIZ_OPTION
(
  OptionNo INT NOT NULL,
  Option_value VARCHAR(500) NOT NULL,
  QuizID VARCHAR(50) NOT NULL,
  QuestionNo INT NOT NULL,
  Selected TINYINT(1) NOT NULL,
  Answer TINYINT(1) NOT NULL,
  CONSTRAINT QUIZ_OPTION_pk PRIMARY KEY (OptionNo, QuizID, QuestionNo),
  CONSTRAINT QUIZ_OPTION_fk1 FOREIGN KEY (QuizID, QuestionNo) REFERENCES QUIZ_QUESTION(QuizID, QuestionNo)
);

insert into ENGINEER values
('samueltan@allinone.com', 'Samuel', 0),
('josiahkang@allinone.com', 'Josiah', 1),
('jonathanteo@allinone.com', 'Jonathan', 0),
('darrentan@allinone.com', 'Darren', 1),
('malcolmlim@allinone.com', 'Malcolm', 1),
('alexlim@allinone.com', 'Alex', 1),
('amytan@allinone.com', 'Amy', 1),
('boblee@allinone.com', 'Bob', 1),
('davidchoi@allinone.com', 'David', 1),
('emilytan@allinone.com', 'Emily', 1),
('evetan@allinone.com', 'Eve', 1)
;

insert into HR values 
('josemong@allinone.com', 'Josem'),
('heidrichlee@allinone.com', 'Heidrich'),
('miturria@allinone.com', 'Miturria'),
('davetan@allinone.com', 'Dave'),
('emelim@allinone.com', 'Eme');

insert into COURSE (Course_Name, Description, Objectives) values
(
    'Introduction to IBM WorkCentre', 
    'The fundamentals of the workcentre at IBM', 
    'For all the engineers to have a basic understanding of the products and solutions of IBM'
),
(
    'Introduction to Canon WorkCentre', 
    'The fundamentals of the workcentre at Canon', 
    'For all the engineers to have a basic understanding of the products and solutions of Canon'
),
(
    'SOP for Repair Work', 
    'The standard operating procedures to follow when executing repair work', 
    'For all the engineers to be able to know all the procedures needed for maintenance work'
);

insert into COURSE values
(
    'Introduction to HP WorkCentre',
    'The fundamentals of the workcentre at HP', 
    'For all the engineers to have a basic understanding of the products and solutions of HP',
    'Introduction to IBM WorkCentre'
),

(
    'Introduction to Xerox WorkCentre', 
    'The fundamentals of the workcentre at Xerox', 
    'For all the engineers to have a basic understanding of the products and solutions of Xerox',
    'Introduction to Canon WorkCentre'
);

insert into CLASS values
('1','2021-10-04 15:30:00','2021-11-04 17:00:00','40', 'Introduction to IBM WorkCentre', 'alexlim@allinone.com'),
('2','2021-10-05 15:30:00','2021-11-05 17:00:00','40', 'Introduction to IBM WorkCentre', 'alexlim@allinone.com'),
('3','2021-10-06 15:30:00','2021-11-06 17:00:00','40', 'Introduction to IBM WorkCentre', 'amytan@allinone.com'),
('4','2021-10-07 16:30:00','2021-11-07 18:00:00','40', 'Introduction to IBM WorkCentre', 'amytan@allinone.com'),
('5','2021-10-08 16:30:00','2021-11-08 18:00:00','40', 'Introduction to IBM WorkCentre', 'alexlim@allinone.com'),
('1','2021-10-04 10:30:00','2021-11-04 12:00:00','40', 'Introduction to Canon WorkCentre', 'boblee@allinone.com'),
('2','2021-10-05 10:30:00','2021-11-05 12:00:00','40', 'Introduction to Canon WorkCentre', 'davidchoi@allinone.com'),
('3','2021-10-06 10:30:00','2021-11-06 12:00:00','40', 'Introduction to Canon WorkCentre', 'boblee@allinone.com'),
('4','2021-10-07 11:30:00','2021-11-07 13:00:00','40', 'Introduction to Canon WorkCentre', 'davidchoi@allinone.com'),
('5','2021-10-08 10:30:00','2021-11-08 13:00:00','40', 'Introduction to Canon WorkCentre', 'boblee@allinone.com'),
('1','2021-10-04 19:30:00','2021-11-04 21:00:00','40','SOP for Repair Work', 'boblee@allinone.com'),
('2','2021-10-05 19:30:00','2021-11-05 21:00:00','40','SOP for Repair Work', 'davidchoi@allinone.com'),
('3','2021-10-06 19:30:00','2021-11-06 21:00:00','40','SOP for Repair Work', 'davidchoi@allinone.com'),
('4','2021-10-07 18:30:00','2021-11-07 20:00:00','40','SOP for Repair Work', 'boblee@allinone.com'),
('5','2021-10-08 18:30:00','2021-11-08 20:00:00','40','SOP for Repair Work','boblee@allinone.com'),
('1','2021-11-09 15:30:00','2021-12-09 17:00:00','40', 'Introduction to HP WorkCentre', 'alexlim@allinone.com'),
('2','2021-11-10 15:30:00','2021-12-10 17:00:00','40', 'Introduction to HP WorkCentre', 'alexlim@allinone.com'),
('3','2021-11-11 15:30:00','2021-12-11 17:00:00','40', 'Introduction to HP WorkCentre', 'amytan@allinone.com'),
('4','2021-11-12 16:30:00','2021-12-12 18:00:00','40', 'Introduction to HP WorkCentre', 'amytan@allinone.com'),
('5','2021-11-13 16:30:00','2021-12-13 18:00:00','40', 'Introduction to HP WorkCentre', 'amytan@allinone.com'),
('1','2021-11-09 10:30:00','2021-12-09 12:00:00','40', 'Introduction to Xerox WorkCentre', 'emilytan@allinone.com'),
('2','2021-11-10 10:30:00','2021-12-10 12:00:00','40', 'Introduction to Xerox WorkCentre','evetan@allinone.com'),
('3','2021-11-11 10:30:00','2021-12-11 12:00:00','40', 'Introduction to Xerox WorkCentre', 'evetan@allinone.com'),
('4','2021-11-12 11:30:00','2021-12-12 13:00:00','40', 'Introduction to Xerox WorkCentre','evetan@allinone.com'),
('5','2021-11-12 11:30:00','2021-12-13 13:00:00','40', 'Introduction to Xerox WorkCentre', 'emilytan@allinone.com');

insert into TRAIN values
('alexlim@allinone.com','1','Introduction to IBM WorkCentre'),
('alexlim@allinone.com','2','Introduction to IBM WorkCentre'),
('amytan@allinone.com','3','Introduction to IBM WorkCentre'),
('amytan@allinone.com','4','Introduction to IBM WorkCentre'),
('alexlim@allinone.com','5','Introduction to IBM WorkCentre'),
('boblee@allinone.com','1','Introduction to Canon WorkCentre'),
('davidchoi@allinone.com','2','Introduction to Canon WorkCentre'),
('boblee@allinone.com','3','Introduction to Canon WorkCentre'),
('davidchoi@allinone.com','4','Introduction to Canon WorkCentre'),
('boblee@allinone.com','5','Introduction to Canon WorkCentre'),
('boblee@allinone.com','1','SOP for Repair Work'),
('davidchoi@allinone.com','2','SOP for Repair Work'),
('davidchoi@allinone.com','3','SOP for Repair Work'),
('boblee@allinone.com','4','SOP for Repair Work'),
('boblee@allinone.com','5','SOP for Repair Work'),
('alexlim@allinone.com','1','Introduction to HP WorkCentre'),
('alexlim@allinone.com','2','Introduction to HP WorkCentre'),
('amytan@allinone.com','3','Introduction to HP WorkCentre'),
('amytan@allinone.com','4','Introduction to HP WorkCentre'),
('amytan@allinone.com','5','Introduction to HP WorkCentre'),
('emilytan@allinone.com','1','Introduction to Xerox WorkCentre'),
('evetan@allinone.com','2','Introduction to Xerox WorkCentre'),
('evetan@allinone.com','3','Introduction to Xerox WorkCentre'),
('evetan@allinone.com','4','Introduction to Xerox WorkCentre'),
('emilytan@allinone.com','5','Introduction to Xerox WorkCentre');

insert into ENROLLMENT values
('samueltan@allinone.com','1','Introduction to IBM WorkCentre',1,1),
('samueltan@allinone.com','1','Introduction to Canon WorkCentre',0,1),
('samueltan@allinone.com','3','SOP for Repair Work',1,1),
('josiahkang@allinone.com','2','Introduction to IBM WorkCentre',0,1),
('josiahkang@allinone.com','3','Introduction to Canon WorkCentre',0,1),
('josiahkang@allinone.com','4','SOP for Repair Work',0,0),
('jonathanteo@allinone.com','3','Introduction to IBM WorkCentre',1,1),
('jonathanteo@allinone.com','4','Introduction to Canon WorkCentre',0,0),
('jonathanteo@allinone.com','5','SOP for Repair Work',1,1),
('darrentan@allinone.com','4','Introduction to IBM WorkCentre',0,1),
('darrentan@allinone.com','5','Introduction to Canon WorkCentre',1,1),
('darrentan@allinone.com','5','SOP for Repair Work',0,0),
('malcolmlim@allinone.com','1','SOP for Repair Work',0,1),
('malcolmlim@allinone.com','4','Introduction to Canon WorkCentre',0,0);


insert into CHAPTER values
(1,'Introduction', '1','Introduction to IBM WorkCentre'),
(2,'Sale', '1','Introduction to IBM WorkCentre'),
(1,'Introduction', '2','Introduction to IBM WorkCentre'),
(2,'Sale', '2','Introduction to IBM WorkCentre'),
(3,'Lease', '2','Introduction to IBM WorkCentre'),
(1,'Repair', '1','Introduction to Canon WorkCentre'),
(1,'Repair', '2','Introduction to Canon WorkCentre'),
(1,'Repair', '3','Introduction to Canon WorkCentre'),
(1,'Maintenance', '1','SOP for Repair Work'),
(1,'Maintenance', '2','SOP for Repair Work'),
(1,'Maintenance', '3','SOP for Repair Work'),
(1,'Maintenance', '4','SOP for Repair Work'),
(1,'Maintenance', '5','SOP for Repair Work');

-- insert into COURSE_MATERIAL values <!LEAVE OUT FIRST>
-- ('Week 1 Lecture','PDF', 'Readings', 38214, 'IBM1023','Introduction to IBM WorkCentre'),
-- ('Week 1 Lecture','Word', 'Notes', 54907, 'IBM1023','Introduction to IBM WorkCentre'),
-- ('Week 1 Lecture','MP4', 'Recording', 66324, 'IBM1023','Introduction to IBM WorkCentre'),
-- ('Week 2 Lecture','PDF', 'Readings', 34688, 'HP3467','Introduction to HP WorkCentre'),
-- ('Week 2 Lecture','Word', 'Notes', 70542, 'XEX5123','Introduction to Xerox WorkCentre');

insert into QUIZ (QuizID, CNo, Course_name, Duration, Total_Questions) values
(1001,'1','Introduction to IBM WorkCentre',20,5),
(1002,'2','Introduction to IBM WorkCentre',20,1),
(1003,'3','Introduction to IBM WorkCentre',20,1),
(1004,'4','Introduction to IBM WorkCentre',20,1),
(1005,'5','Introduction to IBM WorkCentre',20,1),
(2001,'1','Introduction to Canon WorkCentre',30,2),
(2002,'2','Introduction to Canon WorkCentre',30,2),
(2003,'3','Introduction to Canon WorkCentre',30,2),
(2004,'4','Introduction to Canon WorkCentre',30,2),
(2005,'5','Introduction to Canon WorkCentre',30,2),
(3001,'1','SOP for Repair Work',25,2),
(3002,'2','SOP for Repair Work',25,2),
(3003,'3','SOP for Repair Work',25,2),
(3004,'4','SOP for Repair Work',25,2),
(3005,'5','SOP for Repair Work',25,2);

insert into QUIZ (QuizID, CNo, Course_name, Chapter_name) values
(1101,'1','Introduction to IBM WorkCentre','Introduction'),
(1102,'1','Introduction to IBM WorkCentre','Sale'),
(1201,'2','Introduction to IBM WorkCentre','Introduction'),
(1202, '2','Introduction to IBM WorkCentre','Sale'),
(2101, '1','Introduction to Canon WorkCentre','Repair'),
(2201, '2','Introduction to Canon WorkCentre','Repair'),
(2301, '3','Introduction to Canon WorkCentre','Repair'),
(3101, '1','SOP for Repair Work','Maintenance'),
(3201, '2','SOP for Repair Work','Maintenance');


insert into QUIZ_QUESTION values

('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1001),
('3D printer model B700 is able to print objects above 6 inches',2,'t/f',1001),
('How many objects can 3D printer model C700 print objects?',3,'mcq',1001),
('Which of the following 3D printers do we use?',4,'mcq',1001),
('3D printing is good',5,'t/f',1001),

('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1002),
('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1003),
('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1004),
('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1005),

('A 3D printer can only print black or white.',1,'t/f',2001),
('All the printers have wireless function',2,'t/f',2001),
('A 3D printer can only print black or white.',1,'t/f',2002),
('All the printers have wireless function',2,'t/f',2002),
('A 3D printer can only print black or white.',1,'t/f',2003),
('All the printers have wireless function',2,'t/f',2003),
('A 3D printer can only print black or white.',1,'t/f',2004),
('All the printers have wireless function',2,'t/f',2004),
('A 3D printer can only print black or white.',1,'t/f',2005),
('All the printers have wireless function',2,'t/f',2005),

('What is the cheapest raw material that you can use in a 3D printer?',1,'mcq',3001),
('How many default settings are there in HP printers?',2,'mcq',3001),
('What is the cheapest raw material that you can use in a 3D printer?',1,'mcq',3002),
('How many default settings are there in HP printers?',2,'mcq',3002),
('What is the cheapest raw material that you can use in a 3D printer?',1,'mcq',3003),
('How many default settings are there in HP printers?',2,'mcq',3003),
('What is the cheapest raw material that you can use in a 3D printer?',1,'mcq',3004),
('How many default settings are there in HP printers?',2,'mcq',3004),
('What is the cheapest raw material that you can use in a 3D printer?',1,'mcq',3005),
('How many default settings are there in HP printers?',2,'mcq',3005),


('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1101),
('3D printer model B700 is able to print objects above 6 inches',2,'t/f',1101),
('How many objects can 3D printer model C700 print objects?',3,'mcq',1101),
('Which of the following 3D printers do we use?',4,'mcq',1101),
('3D printing is good',5,'t/f',1101),

('3D printer model A500 is able to print objects above 6 inches',1,'t/f',1102),

('3D printer model A500 is able to print objects',1,'t/f',1201),
('3D printer model A500 is able to print objects above 5 inches',1,'t/f',1202),

('All the printers have wireless function',1,'t/f',2101),
('All the printers have wireless function',1,'t/f',2201),
('All the printers have wireless function',1,'t/f',2301),

('How many default settings are there in HP printers?',1,'mcq',3101),
('How many default settings are there in HP printers?',1,'mcq',3201)
;


insert into QUIZ_OPTION values
(1,'true',1001,1,0,0),
(2,'false',1001,1,1,1),

(1,'true',1001,2,1,0),
(2,'false',1001,2,0,1),

(1,'1',1001,3,0,0),
(2,'2',1001,3,0,0),
(3,'3',1001,3,1,0),
(4,'4',1001,3,0,1),

(1,'Canon',1001,4,0,0),
(2,'Brother',1001,4,0,0),
(3,'Acer',1001,4,0,0),
(4,'HP',1001,4,1,1),

(1,'true',1001,5,1,1),
(2,'false',1001,5,0,0),

(1,'true',1002,1,1,0),
(2,'false',1002,1,0,1),

(1,'true',1003,1,1,0),
(2,'false',1003,1,0,1),

(1,'true',1004,1,1,0),
(2,'false',1004,1,0,1),

(1,'true',1005,1,1,0),
(2,'false',1005,1,0,1),

(1,'true',2001,1,1,0),
(2,'false',2001,1,0,1),
(1,'true',2001,2,1,1),
(2,'false',2001,2,0,0),

(1,'true',2002,1,1,0),
(2,'false',2002,1,0,1),
(1,'true',2002,2,1,1),
(2,'false',2002,2,0,0),

(1,'true',2003,1,1,0),
(2,'false',2003,1,0,1),
(1,'true',2003,2,1,1),
(2,'false',2003,2,0,0),

(1,'true',2004,1,1,0),
(2,'false',2004,1,0,1),
(1,'true',2004,2,1,1),
(2,'false',2004,2,0,0),

(1,'true',2005,1,1,0),
(2,'false',2005,1,0,1),
(1,'true',2005,2,1,1),
(2,'false',2005,2,0,0),

(1,'ABS plastic',3001,1,0,1),
(2,'Nylon',3001,1,1,0),
(3,'TPU',3001,1,0,0),
(4,'TPE',3001,1,0,0),
(1,'1',3001,2,0,0),
(2,'2',3001,2,0,0),
(3,'3',3001,2,1,0),
(4,'4',3001,2,0,1),

(1,'ABS plastic',3002,1,0,1),
(2,'Nylon',3002,1,1,0),
(3,'TPU',3002,1,0,0),
(4,'TPE',3002,1,0,0),
(1,'1',3002,2,0,0),
(2,'2',3002,2,0,0),
(3,'3',3002,2,1,0),
(4,'4',3002,2,0,1),

(1,'ABS plastic',3003,1,0,1),
(2,'Nylon',3003,1,1,0),
(3,'TPU',3003,1,0,0),
(4,'TPE',3003,1,0,0),
(1,'1',3003,2,0,0),
(2,'2',3003,2,0,0),
(3,'3',3003,2,1,0),
(4,'4',3003,2,0,1),

(1,'ABS plastic',3004,1,0,1),
(2,'Nylon',3004,1,1,0),
(3,'TPU',3004,1,0,0),
(4,'TPE',3004,1,0,0),
(1,'1',3004,2,0,0),
(2,'2',3004,2,0,0),
(3,'3',3004,2,1,0),
(4,'4',3004,2,0,1),

(1,'ABS plastic',3005,1,0,1),
(2,'Nylon',3005,1,1,0),
(3,'TPU',3005,1,0,0),
(4,'TPE',3005,1,0,0),
(1,'1',3005,2,0,0),
(2,'2',3005,2,0,0),
(3,'3',3005,2,1,0),
(4,'4',3005,2,0,1)

;



insert into QUIZ_OPTION values
(1,'true',1101,1,0,0),
(2,'false',1101,1,1,1),

(1,'true',1101,2,1,0),
(2,'false',1101,2,0,1),

(1,'1',1101,3,0,0),
(2,'2',1101,3,0,0),
(3,'3',1101,3,1,0),
(4,'4',1101,3,0,1),

(1,'Canon',1101,4,0,0),
(2,'Brother',1101,4,0,0),
(3,'Acer',1101,4,0,0),
(4,'HP',1101,4,1,1),

(1,'true',1101,5,1,1),
(2,'false',1101,5,0,0),

(1,'true',1102,1,0,0),
(2,'false',1102,1,1,1),

(1,'true',1201,1,0,0),
(2,'false',1201,1,1,1),

(1,'true',1202,1,0,0),
(2,'false',1202,1,1,1),

(1,'true',2101,1,1,1),
(2,'false',2101,1,0,0),

(1,'true',2201,1,1,1),
(2,'false',2201,1,0,0),

(1,'true',2301,1,1,1),
(2,'false',2301,1,0,0),

(1,'1',3101,1,0,0),
(2,'2',3101,1,0,0),
(3,'3',3101,1,1,0),
(4,'4',3101,1,0,1),

(1,'1',3201,1,0,0),
(2,'2',3201,1,0,0),
(3,'3',3201,1,1,0),
(4,'4',3201,1,0,1);


insert into QUIZ_RESULTS values
(1,5,1,'samueltan@allinone.com',1001,5),
(1,0,0,'josiahkang@allinone.com',1002,2),
(2,1,1,'josiahkang@allinone.com',1002,2);

insert into CREATE_COURSE values
('2021-09-01','Introduction to IBM WorkCentre','josemong@allinone.com'),
('2021-09-01','Introduction to HP WorkCentre','heidrichlee@allinone.com'),
('2021-09-02','Introduction to Xerox WorkCentre','miturria@allinone.com'),
('2021-09-02','Introduction to Canon WorkCentre','davetan@allinone.com'),
('2021-09-03','SOP for Repair Work','emelim@allinone.com');


insert into BADGE values
('2021-09-01','alexlim@allinone.com','Introduction to IBM WorkCentre', 1),
('2021-09-01','amytan@allinone.com','Introduction to HP WorkCentre', 3),
('2021-09-01','samueltan@allinone.com','Introduction to IBM WorkCentre', 1),
('2021-09-01','samueltan@allinone.com','Introduction to Canon WorkCentre', 4);


insert into FORUMPOST values
(
    'Where is the ON button for printer 3110? I cannot seem to find it anywhere', 
    'Beginner',
    'Printer 3110' , 
    '2021-10-06', 
    1, 
    'Introduction to IBM WorkCentre', 
    'samueltan@allinone.com'
),
(
    'Where is the 3D printer settings for a round object?',
    'Intermediate', 
    '3D Printer' , 
    '2021-10-13', 
    1, 
    'Introduction to Canon WorkCentre', 
    'darrentan@allinone.com'
),
(
    'Regarding chapter 2 of 3D printing, how should I insert the ink inside the printer?', 
    'Beginner', 
    '3D Printer' , 
    '2021-10-17', 
    1, 
    'Introduction to Canon WorkCentre', 
    'jonathanteo@allinone.com'
),
(
    'How should I adjust the settings to print two complex shapes one after another?', 
    'Advanced', 
    '3D Printer', 
    '2021-10-28', 
    0, 
    'Introduction to IBM WorkCentre', 
    'josiahkang@allinone.com'
),
(
    'How do you fix a paper jam on printer 3110?', 
    'Beginner', 
    'Printer 3110',
    '2021-10-30', 
    0, 
    'SOP for Repair Work', 
    'josiahkang@allinone.com'
);