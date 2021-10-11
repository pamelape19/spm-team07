import { React, Component } from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

import './css/completedCardListItem.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class CompletedCardListItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const view = this.props.view;
        const courseName = this.props.CourseName;
        const classNum = this.props.ClassNum;
        console.log(courseName)
       
        let typeBtn;
        if (view === "learners"){
            typeBtn = <Button variant="primary">
                        View Course
                      </Button>;
        }
        else{
            typeBtn = <Nav.Link href="/trainers-course" style={{ color: '#00000080' }}> 
                        <Button variant="primary"> Edit Class Content </Button>
                      </Nav.Link>;
        }

        return(
            <div>
                <Card className="card-layout">
                    <div>
                        <img src={ EnrolledClassSample } alt="" class="course-img"/>
                    </div>
                    <div>
                        <h2>
                            
                            <Card.Text>  {courseName}  </Card.Text>
                            <Card.Text>  Class: {classNum}</Card.Text>
                            
                           
                        </h2>
                        <div className="course-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </div>
                        <div className="course-start-date">
                            Start Date: DDMMYY
                        </div>
                        <div className="course-end-date">
                            End Date: DDMMYY
                        </div>
                    </div>
                    <div className="view-course">
                        <div className="view-course-btn">
                            { typeBtn }
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default CompletedCardListItem;