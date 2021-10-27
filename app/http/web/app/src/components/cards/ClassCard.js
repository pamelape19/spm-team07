import { React, Component } from 'react';
import { Card } from 'react-bootstrap';

class ClassCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classNum, capacity, startDateTime, endDateTime } = this.props
        let numSeatsLeft;
        if ( capacity === 0 ){
            numSeatsLeft = <Card.Text style={{ textAlign: 'right', fontStyle:'italic', color:'#B9B9B9' }}>FULL</Card.Text>
        }
        else{
            numSeatsLeft = <Card.Text style={{ textAlign: 'right', fontStyle:'italic', color:'#B9B9B9' }}>{ capacity } left</Card.Text>
        }
        return(
            <div>
                <Card style={{ width: '13.5rem', height: '13.5rem', backgroundColor:'#ECF6FF', borderRadius: '25px', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                    <div style={{ padding: 20}}>
                        { numSeatsLeft }
                        <Card.Title style={{ textAlign: 'left', fontStyle:'bold', marginTop:20 }}>Class { classNum }</Card.Title>
                        <Card.Text style={{ marginBottom: 0 }}>{ startDateTime } - { endDateTime }</Card.Text>
                    </div>
                </Card>
            </div>
        )
    }
}

export default ClassCard;