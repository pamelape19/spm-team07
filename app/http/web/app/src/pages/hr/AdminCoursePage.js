import { React, Component } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

import ClassCard from '../../components/cards/ClassCard';

import '../learners/css/coursePage.css';
import CoursePagePic from "../../resources/course_pic.png";

class AdminCoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            showAddClassModal: false,
            courseNameState : "",
            courseDescState: "",
            courseObjState: "",
            coursePreReqState: ""
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    openModal(){
        this.setState({
            showAddClassModal: true
        })
    }
    closeModal(){
        this.setState({
            showAddClassModal: false
        })
    }
    render(){
        const { showAddClassModal } = this.state;
        let addClassModal;
        if (showAddClassModal===true){
            addClassModal = <div className="add-class-modal-wrapper">
                                <div style={{margin: '9% 15%', background: 'white', padding: '3% 5%'}}>
                                    <h2>Class XX</h2>
                                    <form className="create-course-form">
                                    
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create"> Trainer </label>
                                            <div class="col-sm-7">
                                                <input type="text" class="form-control" id="courseTitle" placeholder="enter trainer"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create">  Start Date </label>
                                            <div class="col-sm-3">
                                                <input type="date" class="form-control" id="courseSectionCount" placeholder="Enter start date"/>
                                            </div>
                                            <label class="col-sm-2 col-form-label label-course-create">  Start Time </label>
                                            <div class="col-sm-3">
                                                <input type="time" class="form-control" id="courseSectionCount" placeholder="Enter start time"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create">  End Date </label>
                                            <div class="col-sm-3">
                                                <input type="date" class="form-control" id="courseSectionCount" placeholder="Enter end date"/>
                                            </div>
                                            <label class="col-sm-2 col-form-label label-course-create">  End Time </label>
                                            <div class="col-sm-3">
                                                <input type="time" class="form-control" id="courseSectionCount" placeholder="Enter end time"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create"> Capacity </label>
                                            <div class="col-sm-7">
                                                <input type="number" min="1" class="form-control" id="courseTitle" placeholder="Enter capacity"/>
                                            </div>
                                        </div>

                                        <div style={{marginTop: 30}}>
                                            <Button variant="secondary" onClick={ this.closeModal }> Cancel </Button>
                                            {" "}
                                            <Button variant="primary" type="submit" > Create Class </Button>
                                        </div>

                                    </form>
                                </div>
                               
                            </div>
        }
        return(
            <div style={{ margin: '3% 0' }}>
                { addClassModal }
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
                                <Col>
                                    <Button className="add-class-btn" onClick={this.openModal}>
                                        <Card style={{ width: '12rem', height: '12rem', borderRadius: '25px', borderStyle:'dashed', borderWidth:'thick' }}>
                                            <div style={{ padding: 20 }}>
                                                <Card.Title style={{ paddingTop: 60, textAlign: 'center', color:'#B9B9B9'}}  className="mb-2 text-muted">Add Class </Card.Title>
                                            </div>
                                        </Card>
                                    </Button>
                                </Col>
                                {Array.from({ length: 4 }).map((_) => (
                                    <Col>
                                        <center>
                                            <a style={{ cursor: 'pointer' }} href="/edit-classlist">
                                                <ClassCard classNum={ 1 } seatsLeft={ 0 } startDate={ "DDMMYY" } startTime={ "00:00" } endDate={ "DDMMYY" } endTime={ "00:00" }/>
                                            </a>
                                        </center>
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

export default AdminCoursePage;