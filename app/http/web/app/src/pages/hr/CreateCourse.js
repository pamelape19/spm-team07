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
                 <Container className="create-course-layout">
                     <div></div>
                     <div>
                        <h1>HP Printer</h1>
                        <h4>Basics of 3D Printing</h4>
                    </div>
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