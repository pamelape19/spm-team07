import { React, Component } from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

import './css/completedCardListItem.css';
import enrolledClassSample from '../../resources/enrolledClassSample.png';

class CompletedCardListItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { view, courseName, classNum, startDateTime, endDateTime, capacity, dateCompleted } = this.props;
       
        let typeBtn;
        let cardDetails;
        if (view === "learners"){
            let courseMaterialhref =  "/course-materials/" + courseName + "/" + classNum
            typeBtn = <Nav.Link href={ courseMaterialhref } style={{ color: '#00000080' }}>
                            <Button variant="primary">
                                View Course
                            </Button>
                        </Nav.Link>
            cardDetails = <div>
                <div className="course-desc">
                    Date completed: { dateCompleted }
                </div>
            </div>
        }
        else{
            let courseClassLink = '/trainers-course/' + courseName + '/' + classNum
            typeBtn = <Nav.Link href={ courseClassLink } style={{ color: '#00000080' }}> 
                        <Button variant="primary"> Edit Class Content </Button>
                      </Nav.Link>;
            cardDetails = <div>
                            <div className="course-desc">
                                Capacity: { capacity }
                            </div>
                            <div className="course-start-date">
                                { startDateTime } - { endDateTime }
                            </div>

                        </div>
        }

        return(
            <div>
                <Card className="card-layout">
                    <div>
                        <img src={ enrolledClassSample } alt="" class="course-img"/>
                    </div>
                    <div>
                        <h2>
                            <Card.Text>  { courseName }  </Card.Text>
                            <Card.Text>  Class: { classNum }</Card.Text>
                        </h2>
                        { cardDetails }
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