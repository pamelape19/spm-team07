import { React, Component } from 'react';
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import './css/cardListItem.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class CardListItem extends Component{
    constructor(props){
        super(props);

    }
    render(){
        const perc = this.props.perc;
        const coursebtn = this.props.coursebtn;
        const assigned = this.props.assigned;

        // conditional rendering for card button
        let courseButton;
        if (coursebtn === "resume"){
            courseButton = <Button variant="primary">Resume Course</Button>;
        }
        if (coursebtn === "start"){
            courseButton = <Button variant="primary">Start Course</Button>;
        }

        // conditional rendering 'assigned' badge
        let assignedBadge;
        if (assigned === "True"){
            assignedBadge = <Badge pill style={{ background: '#BDE77A', color: '#000000', fontSize: 15 }}>Assigned</Badge>;
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
                            HP Printer 1337 Tutorial
                            {' '}
                            { assignedBadge }
                        </h2>
                        <div className="course-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </div>
                        <div className="course-start-date">
                            Start Date: DDMMYY
                        </div>
                        <div className="progress-bar-col">
                            <ProgressBar now={ perc } variant="warning" style={{ background: 'white', border: '1px solid #E5E5E5' }}/>
                            <span class="percentage">{ perc }%</span>
                        </div>
                    </div>
                    <div className="course-resumption">
                        <h5>Ends on 24th Dec</h5>
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