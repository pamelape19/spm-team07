import { React, Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ClassCard from '../../components/cards/ClassCard';

import './css/coursePage.css';
import CoursePagePic from "../../resources/course_pic.png";

class CoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseNameState : "",
            courseDescState: "",
            courseObjState: "",
            coursePreReqState: "",
            allClasses: [],
            numClasses: 0,
            courseClasses: []
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        this.setState({
            courseNameState: courseName
        })

        fetch('http://127.0.0.1:5002')
        .then(res => res.json())
        .then(result => {
            let courses = result.data.courses;
            courses.map((course) => {
                if (course.course_name === this.state.courseNameState){
                    this.setState({
                        courseDescState: course.description,
                        courseObjState: course.objectives,
                    })
                    if (course.prereq_name === null){
                        this.setState({
                            coursePreReqState: "None"
                        })
                    }
                    else{
                        this.setState({
                            coursePreReqState: course.prereq_name
                        })
                    }
                }

            })
        })

        fetch('http://127.0.0.1:5003')
        .then(res => res.json())
        .then(result => {
            this.setState({
                allClasses: result.data.classes
            })
            this.state.allClasses.map((courseClass)=>{
                if ( courseClass.Course_name === this.state.courseNameState ){
                    this.setState ({ 
                        courseClasses: [...this.state.courseClasses, [courseClass.CNo, courseClass.Capacity, courseClass.Start_datetime, courseClass.End_datetime, courseClass.Trainer]]
                    })
                }

            })
        })

    }
    
    render(){
        const { courseClasses, courseNameState, courseDescState, courseObjState, coursePreReqState } = this.state;

        const classInfo = courseClasses.map((classInfo)=>
            <Col>
                <ClassCard user="learner" courseName={ this.state.courseNameState } classNum={ classInfo[0] } capacity={ classInfo[1] } startDateTime={ classInfo[2] } endDateTime={ classInfo[3] } trainer = { classInfo[4] }/>
            </Col>
        )

        return(
            <div style={{ margin: '3% 0' }}>

                <Container className="course-page-container">
                     <div>
                        <img src={ CoursePagePic } alt="" style={{ width: '75%' }}/></div>
                     <div>
                        <h1>{ courseNameState }</h1>
                        <h4>Course Description</h4>
                        <p>{ courseDescState }</p>
                        <h4>Course Objective</h4>
                        <p>{ courseObjState }</p>
                        <h4>Pre-requisites</h4>
                        <p>{ coursePreReqState }</p>
                        <h4>Classes</h4>
                        <Container className="create-course-layout">
                        <div>
                            <Row xs={1} md={2} className="g-4">
                                { classInfo }
                            </Row>
                        </div>
                        
                        </Container>

                    </div>
                </Container>
            </div>
        )
    }
}

export default CoursePage;