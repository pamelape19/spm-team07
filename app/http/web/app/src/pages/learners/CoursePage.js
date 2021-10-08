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
            coursePreReqState: ""
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        console.log(tokenString);
        let tokenWords = tokenString[4].split('%20');
        console.log(tokenWords)
        let courseName = tokenWords.join(" ");
        console.log(courseName)
        this.setState({
            courseNameState: courseName
        })

        fetch('http://localhost:5000/course')
        .then(res => res.json())
        .then(result => {
            console.log(result);
            let courses = result.data.courses;
            console.log(courses)
            const course = courses.map((course) => {
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



    }
    render(){
        return(
            <div style={{ margin: '3% 0' }}>

                <Container className="course-page-container">
                     <div>
                        <img src={ CoursePagePic } alt="" style={{ width: '75%' }}/></div>
                     <div>
                        <h1>{ this.state.courseNameState }</h1>
                        <h4>Course Description</h4>
                        <p>{ this.state.courseDescState }</p>
                        <h4>Course Objective</h4>
                        <p>{ this.state.courseObjState }</p>
                        <h4>Pre-requisites</h4>
                        <p>{ this.state.coursePreReqState }</p>
                        {/* <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul> */}
                        <h4>Classes</h4>
                        <Container className="create-course-layout">
                        <div>
                            <Row xs={1} md={2} className="g-4">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <Col>
                                        <ClassCard classNum={ 1 } seatsLeft={ 0 } startDate={ "DDMMYY" } startTime={ "00:00" } endDate={ "DDMMYY" } endTime={ "00:00" }/>
                                    </Col>
                                ))}
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