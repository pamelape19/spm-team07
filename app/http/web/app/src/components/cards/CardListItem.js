import { React, Component } from 'react';
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import './css/cardListItem.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class CardListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginEmailState: "samueltan@allinone.com"
        }
    }
    render(){
        
        const { perc, coursebtn, assigned, CourseName, ClassNum, startDateTime, endDateTime, courseDesc } = this.props;
        const { loginEmailState } = this.state;

        // variable to allow the href to pass in the course number to get the correct quiz 
        let courseMaterialhref =  "/course-materials/" + CourseName + "/" + ClassNum + "/" + loginEmailState
 
        
        // conditional rendering for card button
        let courseButton;
        if (coursebtn === "resume"){
            courseButton = <Button variant="primary" href= { courseMaterialhref }> Resume Course </Button>;
        }
        if (coursebtn === "start"){
            courseButton = <Button variant="primary" href= { courseMaterialhref }> Start Course </Button>;
        }

        // conditional rendering 'assigned' badge
        let assignedBadge;
        if (assigned === true){
            assignedBadge = <Badge pill style={{ background: '#BDE77A', color: '#000000', fontSize: 15 }}>
                                Assigned
                            </Badge>;
        }
        else{
            assignedBadge = "";
        }

        return(
            <div>
                <Card className="card-layout">
                    <div>
                        <img src={ EnrolledClassSample } alt="" class="course-img"/>
                    </div>
                    <div>
                        <h2>
                            { CourseName }
                            {' '}
                            { assignedBadge }
                        </h2>
                        <div className="course-desc">
                            { courseDesc }
                        </div>
                        <div className="course-start-date">
                            Start Date: { startDateTime }
                        </div>
                        <div className="progress-bar-col">
                            <ProgressBar now={ perc } variant="warning" style={{ background: 'white', border: '1px solid #E5E5E5' }}/>
                            <span class="percentage">{ perc }%</span>
                        </div>
                    </div>
                    <div className="course-resumption">
                        <h5>Ends on { endDateTime }</h5>
                        <div className="resumption-btn">
                            { courseButton }
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default CardListItem;