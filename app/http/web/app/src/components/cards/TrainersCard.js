import {React, Component } from 'react';
import { Card, Nav } from 'react-bootstrap';
import bg from "../../resources/courseCardBg.png";

class TrainersCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const link = this.props.link;
        return(
            <div>
                <a style={{ cursor: 'pointer'}} href={ link }>
                    <Card style={{ width: '18rem', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                        <Card.Img variant="top" src={ bg } />
                        <div style={{ padding: 10 }}>
                            <Card.Title>Assign To Course</Card.Title>
                        </div>
                    </Card>
                </a>
            </div>
        )
    }
}

export default TrainersCard;