import { React, Component } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import pic from "../../resources/course_pic.png";

import "./css/createCourse.css";

class CreateCourse extends Component{
    constructor(props){
        super(props);
 
    }
    render(){
        return(
            <div style={{margin: '3% 0'}}>
                 <Container className="create-course-layout">
                     <div>
                     <img src={pic} alt=""/></div>
                     <div>
                        <h1>Basics of 3D Printing</h1>
                        <h4>Course Description</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed euismod enim varius risus fringilla feugiat. 
                            Fusce finibus libero sapien, non iaculis ligula pharetra nec. 
                            Aenean et sem egestas, interdum arcu eu, rutrum turpis. 
                            In tempus porta orci, eget lobortis neque congue porttitor. 
                            Pellentesque fermentum ante massa, auctor maximus quam sodales sit amet. </p>
                        <h4>Pre-requisites</h4>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                        <h4>Classes</h4>
                        <Container className="create-course-layout">
                        <div>
                        <Card style={{ width: '12rem', height: '12rem', backgroundColor:'#ECF6FF', borderRadius: '25px', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                        <div style={{ padding: 20}}>
                            <Card.Text style={{textAlign: 'right', fontStyle:'italic', color:'#B9B9B9'}}>FULL</Card.Text>
                            <Card.Title style={{textAlign: 'left', fontStyle:'bold', marginTop:20}}>Class 1</Card.Title>
                            <Card.Text style={{ marginBottom: 0}}>DDMMYY 00:00 - </Card.Text>
                            <Card.Text>DDMMYY 00:00</Card.Text><br/>
                        </div>
                        </Card>
                        </div>
                        <div>
                        <Card style={{ width: '12rem', height: '12rem', backgroundColor:'#ECF6FF', borderRadius: '25px', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                        <div style={{ padding: 20}}>
                            <Card.Text style={{textAlign: 'right', fontStyle:'italic', color:'#B9B9B9'}}>3 left</Card.Text>
                            <Card.Title style={{textAlign: 'left', fontStyle:'bold', marginTop:20}}>Class 2</Card.Title>
                            <Card.Text style={{ marginBottom: 0}}>DDMMYY 00:00 - </Card.Text>
                            <Card.Text>DDMMYY 00:00</Card.Text><br/>
                        </div>
                        </Card>
                        </div>
                        <div>
                        <Card style={{ width: '12rem', height: '12rem', borderRadius: '25px', borderStyle:'2px dashed',marginTop:20 }}>
                        <div style={{ padding: 20}}>
                            {/* <Card.Text style={{textAlign: 'right', fontStyle:'italic', color:'#B9B9B9'}}>3 left</Card.Text> */}
                            {/* <Card.Title style={{textAlign: 'left', fontStyle:'bold', marginTop:20}}>Class 2</Card.Title> */}
                            <Card.Text style={{ paddingTop: 60, textAlign: 'center', color:'#B9B9B9'}}>Add Class </Card.Text>
                            {/* <Card.Text>DDMMYY 00:00</Card.Text><br/> */}
                        </div>
                        </Card>
                        </div>
                        </Container>

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