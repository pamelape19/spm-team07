import { React, Component } from 'react';
import { Container, Button, Toast, Spinner } from 'react-bootstrap';

import "./css/createCourse.css";

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            showToast: false
        }
        this.createCourseLoader = this.createCourseLoader.bind(this);
    }
    createCourseLoader(){
        this.setState({
            showToast: true
        })
        window.setTimeout(function() {
            window.location.href = 'http://localhost:3000/admin-home';
        }, 1000);
        
    }
    render(){
        let createCourseToast;
        if (this.state.showToast === true){
            createCourseToast =  <div
                                    aria-live="polite"
                                    aria-atomic="true"
                                    className="course-toast-wrapper"
                                    delay='30000'
                                >
                                    <Container>
                                        <Toast style={{margin:'auto', paddingTop: 15, marginTop: '23%'}}>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                            <Toast.Body>
                                                <center>Creating course...</center>
                                            </Toast.Body>
                                        </Toast>
                                    </Container>
                                </div>
        }
        else{
            createCourseToast = ""
        }

        return(
            <div style={{margin: '8% 15%'}}>
                <Container>
                <h1 style={{margin:'0 3%'}}>Create Course</h1>
                { createCourseToast }
                <div>
                    <form className="create-course-form">
                        
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label label-course-create">Course Name </label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="courseTitle" placeholder={" " + "Enter course name"}/>
                                </div>
                            </div>
                      
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label label-course-create"> Course Description </label>
                                <div class="col-sm-8">
                                <textarea class="form-control" id="courseSectionCount" placeholder="Enter course description"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label label-course-create">Pre-requisites of Course</label>
                                <div class="col-sm-8" style={{textAlign: 'left'}}>
                                    <div class='form-check'>
                                        <input class="form-check-input" type="checkbox" id="gridCheck1"/>
                                        <label class="form-check-label" for="gridCheck1">
                                            Example checkbox
                                        </label>
                                    </div>
                                        
                                </div>
                            </div>
                            
                            {/* <div class="form-group row">
                                <label class="col-sm-2 col-form-label label-course-create">  Start Date </label>
                                <div class="col-sm-3">
                                <input type="date" class="form-control" id="courseSectionCount" placeholder="Enter start date"/>
                                </div>
                            </div> */}
                      
                        <div className="create-course-btn-layout">
                            <div></div>
                            <Button variant="secondary" href="/admin-home"> Cancel </Button>
                            <Button variant="primary" onClick={this.createCourseLoader} > Create Course </Button>
                            <div></div>
                        </div>

                    </form>
                </div>

                </Container>
            </div>
        )
    }
}

export default CreateCourse;