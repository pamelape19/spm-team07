import { React, Component } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';

import Dubibird from '../../resources/dubibird.png';
import "./css/individualtrainer.css";

class IndividualTrainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            completedCourses: ["Printer 9110 Servicing","Printer 9110 Introduction"],
            currentlyLearnings:["Introduction to 3D printing", "Printer 3110 Introduction"]
        }
 
    }
    render(){
        return(
            <div style={{ margin: '10% 0' }}>
                <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-home" style={{ margin: 10 }}>
                    <Nav.Item>
                        <Nav.Link href="/admin-home" style={{ color: '#000000', fontWeight: 'bold' }}>Manage Trainers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/manage-learners" style={{ color: '#00000080' }}>Manage Learners</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/create-course" style={{ color: '#00000080' }}>Manage Courses</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Container>

                <Container className="indiv-trainer-content">
                    <div className="bg-box">
                        <h3 class="indiv-trainer-learner"> Learner </h3>  
                        <div className="learner-profile-layout">
                            <div>
                                <div className="indiv-trainer-headerspace">
                                    <span className="headertext"> Name: </span>  Mr dubibird 
                                </div>
                                <div className="indiv-trainer-headerspace">
                                    <span className="headertext"> Title: </span> Senior engineer 
                                </div>
                                <div className="indiv-trainer-headerspace">
                                    <span className="headertext"> Currently learning: </span> 
                                </div>
                                {this.state.currentlyLearnings.map((currentlyLearning) =>
                                    <div className="indiv-trainer-headerspace">
                                        { currentlyLearning }
                                    </div>
                                )}
                                <div className="indiv-trainer-headerspace">
                                    <span className="indiv-trainer-headertext"> Courses completed: </span> 
                                </div>
                                {this.state.completedCourses.map((completedCourse) =>
                                    <div className="indiv-trainer-headerspace">
                                        { completedCourse }
                                    </div>
                                )}

                            </div>
                            <img src={ Dubibird } alt="" className="indiv-trainer-imageclass"  />
                        </div>
                        <Button variant="primary" className="assign-learner-btn">Assign Learner </Button>
                    </div>    
                </Container>
            </div>
        )
    }
}

export default IndividualTrainer;
