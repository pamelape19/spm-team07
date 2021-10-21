import { React, Component } from 'react';
import { Container } from 'react-bootstrap';

import { Accordion } from 'react-accessible-accordion';
import AccordionTop from '../general/AccordionTop';
import AccordionChapters from '../general/AccordionChapters';
import AccordionFinalQuiz from '../general/AccordionFinalQuiz';

import './css/courseMaterials.css';
import './css/accordionStyle.css';

import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class CourseMaterials extends Component{
    constructor(props){
        super(props);
        this.state = {
            CourseChapters: [],
            ClassNumState: null,
            CourseNameState: "",
            StartDateTimeState: null,
            EndDateTimeState: null,
            TrainerState: ""
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let CourseName = tokenWords.join(" ");
        let ClassNum = parseInt(tokenString[5])

        this.setState({
            ClassNumState: ClassNum,
            CourseNameState: CourseName,
        })

        fetch('http://127.0.0.1:5000/chapter')
        .then(res => res.json())
        .then(result => {

            let allCourses = result.data.enrollment;
            
            const CourseChapter = allCourses.map((CourseChapter) => {
              
                if (CourseChapter.course_name == this.state.CourseNameState && CourseChapter.CNo == this.state.ClassNumState){

                    this.setState({
                        
                        CourseChapters: [...this.state.CourseChapters, [CourseChapter.CNo, CourseChapter.course_name, CourseChapter.chapterNo, CourseChapter.chapter_name ]]
                    })

                    
                }
                

            });
        })

        fetch('http://127.0.0.1:5000/classes')
        .then(res => res.json())
        .then(result => {
            let allClasses = result.data.classes;
            const classOfCourse = allClasses.map((classOfCourse) => {
                if (classOfCourse.Course_name === this.state.CourseNameState && classOfCourse.CNo === this.state.ClassNumState){
                    this.setState({
                        StartDateTimeState: classOfCourse.Start_date,
                        EndDateTimeState: classOfCourse.End_date,
                        TrainerState: classOfCourse.Trainer
                    })
                }
            })
        })
    }
    render(){
        const { CourseChapters, ClassNumState, CourseNameState, StartDateTimeState, EndDateTimeState, TrainerState } = this.state;

        // need a completed column for quiz 
        const numCompleted = CourseChapters.length;
        const totalChapters = CourseChapters.length;
        return( 
            <div style={{ margin: '8% 0' }}>
                 <Container className="course-materials-header">
                    <div>
                        <h2>
                            { CourseNameState }
                        </h2>
                        <div className="course-start-date">
                            Class duration: { StartDateTimeState } - { EndDateTimeState } <br/>
                            Trainer: { TrainerState }
                        </div>
                    </div>
                    <span className="img-grid">
                        <img src={ EnrolledClassSample } alt="" className="course-img"/>
                    </span>
                </Container>
                <Container className="main-body">
                    <Accordion>
                        <AccordionTop courseName={ CourseNameState } classNum={ ClassNumState }/>

                        {/* {Array.from({ length: totalChapters }).map((_, idx) => (
                            <AccordionChapters chapter={ idx + 1 } name="What is 3d printing" completed={ numCompleted }/>
                        ))}
                          */}
                        {CourseChapters.map((CourseChapter)=>(
                            <AccordionChapters chapter={ CourseChapter[2] } chapterName={ CourseChapter[3] } completed={ numCompleted } classNum = { ClassNumState } courseName = { CourseChapter[1] }/>
                        ))}
                        <AccordionFinalQuiz completed={ numCompleted } totalChapters={ totalChapters } courseName={ CourseNameState } classNum={ ClassNumState }/>
                    </Accordion>
                </Container>
            </div>
        )
    }
};
export default CourseMaterials;