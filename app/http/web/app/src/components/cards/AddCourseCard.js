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
                    <Card style={{ width: '16rem', height:'18rem', borderStyle:'dashed', borderWidth:'thick' }}>
                        <div style={{ padding: 20, alignItems: 'center', margin: 40}}>
                            <Card.Title style={{justifyContent: 'center', paddingTop: "50%"}} className="mb-2 text-muted">
                                Add Course
                            </Card.Title>
                        </div>
                    </Card>
                </a>
            </div>
        )

    }
}

export default AddCourseCard;