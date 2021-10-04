import {React, Component } from 'react';
import { Card } from 'react-bootstrap';

class AddCourseCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const link = this.props.link;
        return(
            <div>
                <a style={{ cursor: 'pointer'}} href={ link }>
                    <Card style={{ width: '16rem', height:'16rem', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                        {/* <Card.Img variant="top" src={ bg } /> */}
                        <div style={{ padding: 20, alignItems: 'center', margin: 40}}>
                            <Card.Title style={{justifyContent: 'center', paddingTop: "40%"}} className="mb-2 text-muted">Add Course</Card.Title>
                            {/* <Card.Text>Add Course</Card.Text> */}
                        </div>
                    </Card>
                </a>
            </div>
        )

    }
}

export default AddCourseCard;