import { React, Component } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

import ClassCard from '../../components/cards/ClassCard';

import '../learners/css/coursePage.css';
import CoursePagePic from "../../resources/course_pic.png";

class AdminCoursePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{ margin: '3% 0' }}>

                <Container className="course-page-container">
                     <div>
                        <img src={ CoursePagePic } alt="" style={{ width: '75%' }}/></div>
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
                            <Row xs={1} md={2} className="g-4">
                                <Col>
                                    <Card style={{ width: '12rem', height: '12rem', borderRadius: '25px', borderStyle:'dashed', borderWidth:'thick' }}>
                                        <div style={{ padding: 20 }}>
                                            <Card.Text style={{ paddingTop: 60, textAlign: 'center', color:'#B9B9B9'}}>Add Class </Card.Text>
                                        </div>
                                    </Card>
                                </Col>
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

export default AdminCoursePage;