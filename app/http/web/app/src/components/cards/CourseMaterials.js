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
            TrainerState: "",
            courseDesc: "",
            numCompleted: 0
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let CourseName = tokenWords.join(" ");
        let ClassNum = parseInt(tokenString[5])
        let enginEmail = tokenString[6]
        this.setState({
            ClassNumState: ClassNum,
            CourseNameState: CourseName,
            enginEmailState: enginEmail,
        })

        fetch('http://127.0.0.1:5006')
        .then(res => res.json())
        .then(result => {

            let allCourses = result.data.chapter;
            
            allCourses.map((CourseChapter) => {

                if (CourseChapter.course_name === CourseName && CourseChapter.CNo === ClassNum){
                    this.setState({
                        CourseChapters: [...this.state.CourseChapters, [CourseChapter.CNo, CourseChapter.course_name, CourseChapter.chapterNo, CourseChapter.chapter_name ]]
                    })
                }
            });
        })

        fetch('http://127.0.0.1:5003')
        .then(res => res.json())
        .then(result => {
            let allClasses = result.data.classes;
            allClasses.map((classOfCourse) => {
                if (classOfCourse.Course_name === this.state.CourseNameState && classOfCourse.CNo === this.state.ClassNumState){
                    this.setState({
                        StartDateTimeState: classOfCourse.Start_datetime,
                        EndDateTimeState: classOfCourse.End_datetime,
                        TrainerState: classOfCourse.engin_email
                    })
                }
            })
        })

        fetch('http://127.0.0.1:5002/' + CourseName)
        .then(res => res.json())
        .then(result => {
            this.setState({
                courseDesc: result.data.description
            })
        })

        fetch('http://127.0.0.1:5004/get-completed/' + CourseName + '/' + ClassNum + '/' + enginEmail)
        .then(res => res.json())
        .then(result => {
            this.setState({
                numCompleted: result.data.completed
            })
        })
    }
    render(){
        const { CourseChapters, ClassNumState, CourseNameState, StartDateTimeState, EndDateTimeState, TrainerState, courseDesc, numCompleted, enginEmailState } = this.state;

        // need a completed column for quiz 
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
                        <AccordionTop courseName={ CourseNameState } classNum={ ClassNumState } courseDesc={ courseDesc }/>
                            {CourseChapters.map((CourseChapter)=>(
                                <AccordionChapters chapter={ CourseChapter[2] } chapterName={ CourseChapter[3] } completed={ numCompleted } classNum = { ClassNumState } courseName = { CourseChapter[1] } enginEmail={ enginEmailState }/>
                            ))}
                        <AccordionFinalQuiz completed={ numCompleted } totalChapters={ totalChapters } courseName={ CourseNameState } classNum={ ClassNumState }/>
                    </Accordion>
                </Container>
            </div>
        )
    }
};
export default CourseMaterials;