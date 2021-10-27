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
            coursePreReqState: "",
            allClasses: [],
            numClasses: 0,
            courseClasses: [],
            engineers: [],
            isTrainer: [],
            
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
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

        fetch('http://127.0.0.1:5014')
        .then(res => res.json())
        .then(result => {
            let engineers = result.data.engineers;
            engineers.map((engineer) => {
                if (engineer.trainer == "1") {
                    this.setState({
                        isLoaded: true,
                        isTrainer: [...this.state.isTrainer, engineer.engin_email]
                    });
                }
            })
        })
    }

    openModal(){
        this.setState({
            showAddClassModal: true
        })
        
        fetch('http://127.0.0.1:5003/'+this.state.courseNameState)
        .then(res => res.json())
        .then(result => {
            console.log(result.data.classes)
            let num_classes = result.data.classes.length
            console.log(num_classes)
            this.setState({
                numClasses: num_classes+1
            })
            // let engineers = result.data.engineers;
            // engineers.map((engineer) => {
            //     if (engineer.trainer == "1") {
            //         this.setState({
            //             isLoaded: true,
            //             isTrainer: [...this.state.isTrainer, engineer.engin_name]
            //         });
            //     }
            // })
        })

        
        
    }
    closeModal(){
        this.setState({
            showAddClassModal: false
        })
    }
    handleSubmitted(){
        const classForm = document.getElementById('classForm');
        console.log(classForm);
        const formData = new FormData(classForm);
        console.log(formData);
        fetch('http://127.0.0.1:5003/' + this.state.courseNameState + '/' + this.state.numClasses,{
            method: "POST",
            body: formData          
        })
        this.setState({
            showAddClassModal: false
        })
        window.location.reload(false)
        

    }
    render(){
        const { showAddClassModal, courseClasses, courseNameState, courseDescState, courseObjState, coursePreReqState, isTrainer } = this.state;
        const trainers = isTrainer.map((trainer) => <option value={trainer}>{trainer}</option>)
        
        let addClassModal;
        if (showAddClassModal===true){
            addClassModal = <div className="add-class-modal-wrapper">
                                <div style={{margin: '9% 15%', background: 'white', padding: '3% 5%'}}>
                                    <h2>Class {this.state.numClasses} </h2>
                                    <form id="classForm" className="create-course-form">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create"> Trainer </label>
                                            <div class="col-sm-7">
                                                <select class="form-select" name = "trainer" >
                                                        { trainers }
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create">  Start Date </label>
                                            <div class="col-sm-3">
                                                <input type="date" name = "startDate" class="form-control" id="courseSectionCount" placeholder="Enter start date"/>
                                            </div>
                                            <label class="col-sm-2 col-form-label label-course-create">  Start Time </label>
                                            <div class="col-sm-3">
                                                <input type="time" name = "startTime" class="form-control" id="courseSectionCount" placeholder="Enter start time"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create">  End Date </label>
                                            <div class="col-sm-3">
                                                <input type="date" name = "endDate" class="form-control" id="courseSectionCount" placeholder="Enter end date"/>
                                            </div>
                                            <label class="col-sm-2 col-form-label label-course-create">  End Time </label>
                                            <div class="col-sm-3">
                                                <input type="time" name = "endTime" class="form-control" id="courseSectionCount" placeholder="Enter end time"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label label-course-create"> Capacity </label>
                                            <div class="col-sm-7">
                                                <input type="number" name = "capacity"  min="1" class="form-control" id="courseTitle" placeholder="Enter capacity"/>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 30 }}>
                                            <Button variant="secondary" onClick={ this.closeModal }> Cancel </Button>
                                            {" "}
                                            <Button variant="primary" type="submit" onClick={ this.handleSubmitted }> Create Class </Button>
                                        </div>

                                    </form>
                                </div>
                               
                            </div>
        }

        const classInfo = courseClasses.map((classInfo)=>
            <Col>
                <center>
                    <a style={{ cursor: 'pointer' }} href="/edit-classlist">
                        <ClassCard user="admin" classNum={ classInfo[0] } capacity={ classInfo[1] } startDateTime={ classInfo[2] } endDateTime={ classInfo[3] } trainer = { classInfo[4] }/>
                    </a>
                </center>
            </Col>
        )
        return(
            <div style={{ margin: '3% 0' }}>
                { addClassModal }
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
                                <Col>
                                    <Button className="add-class-btn" onClick={ this.openModal }>
                                        <Card style={{ width: '15rem', height: '15.5rem', borderRadius: '25px', borderStyle:'dashed', borderWidth:'thick' }}>
                                            <div style={{ padding: 20 }}>
                                                <Card.Title style={{ paddingTop: 90, textAlign: 'center', color:'#B9B9B9'}}  className="mb-2 text-muted"> Add Class </Card.Title>
                                            </div>
                                        </Card>
                                    </Button>
                                </Col>
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

export default AdminCoursePage;