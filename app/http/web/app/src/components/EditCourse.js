import { React, Component } from 'react';
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import './editCourse.css';
import EnrolledClassSample from '../resources/enrolledClassSample.png';

class EditCourse extends Component{
    constructor(props){
        super(props);

    }
    render(){
        const perc = this.props.perc;

        return(
            <div>
                testing
                <Card className="card-layout">
                    <div>
                        <img src={ EnrolledClassSample } alt="" class="course-img"/>
                    </div>
                    <div>
                        <h2>
                            HP Printer 1337 Tutorial
                        </h2>
                        <div className="course-start-date">
                            Class duration: DDMMYY - DDMMYY <br/>
                            Trainer: xxxxxxxxxxxxxxx
                        </div>

                        <div className="course-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </div>
 
                    </div>

                </Card>
            </div>
        )
    }
}

export default EditCourse;