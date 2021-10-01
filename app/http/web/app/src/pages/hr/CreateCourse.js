import { React, Component } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';

import "./css/createCourse.css";

class CreateCourse extends Component{
    constructor(props){
        super(props);
 
    }
    render(){
        return(
            <div style={{margin: '3% 0'}}>
                 <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-home" style={{margin: 10}}>
                    <Nav.Item>
                        <Nav.Link href="/admin-home" style={{color: '#00000080'}}>Manage Trainers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/manage-learners" style={{color: '#00000080'}}>Manage Learners</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/create-course" style={{color: '#000000', fontWeight: 'bold'}}>Manage Courses</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Container>

                {/* <img src={banner} alt="" style={{width: '100%'}}/> */}
                <Container style={{marginTop: '5%'}} class="contentthing">


                <div class="form-container">
                    <form className="quiz-form form-course-create">
                        <div className="quiz-row">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label label-course-create">Course Name </label>
                                <div class="col-sm-9">
                                <input type="text" readonly class="form-control" id="courseTitle" placeholder={" "+"Chapter XX - Enter course name"}/>
                                </div>
                            </div>
                        </div>
                        <div className="quiz-row">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label label-course-create"> Number of Sections</label>
                                <div class="col-sm-3">
                                <input type="number" class="form-control" id="courseSectionCount" placeholder="Enter num of setions"/>
                                </div>
                            </div>
                        </div>

                        <div className="quiz-row">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label label-course-create"> Capacity </label>
                                <div class="col-sm-3">
                                <input type="number" class="form-control" id="courseSectionCount" placeholder="Enter max capacity"/>
                                </div>
                            </div>
                        </div>

                        <div className="quiz-row">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label label-course-create">  Start Date </label>
                                <div class="col-sm-3">
                                <input type="date" class="form-control" id="courseSectionCount" placeholder="Enter start date"/>
                                </div>
                            </div>
                        </div>

                        
                        <div className="quiz-row">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label label-course-create">  End Date </label>
                                <div class="col-sm-3">
                                <input type="date" class="form-control" id="courseSectionCount" placeholder="Enter end date"/>
                                </div>
                            </div>
                        </div>

                        <div className="create-btn">
                            <div></div>

                        </div>

                        <Button type="submit" variant="secondary"> Create Course </Button>

                    </form>
                </div>
                 

                     
                </Container>
            </div>
        )
    }
}

export default CreateCourse;