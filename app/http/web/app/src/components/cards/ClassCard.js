import { React, Component } from 'react';
import { Card } from 'react-bootstrap';

class ClassCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { classNum, seatsLeft, startDate, startTime, endDate, endTime } = this.props
        let numSeatsLeft;
        if ( seatsLeft===0 ){
            numSeatsLeft = <Card.Text style={{textAlign: 'right', fontStyle:'italic', color:'#B9B9B9'}}>FULL</Card.Text>
        }
        else{
            numSeatsLeft = <Card.Text style={{textAlign: 'right', fontStyle:'italic', color:'#B9B9B9'}}>{ seatsLeft } left</Card.Text>
        }
        return(
            <div>
                <Card style={{ width: '12rem', height: '12rem', backgroundColor:'#ECF6FF', borderRadius: '25px', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                    <div style={{ padding: 20}}>
                        { numSeatsLeft }
                        <Card.Title style={{textAlign: 'left', fontStyle:'bold', marginTop:20}}>Class { classNum }</Card.Title>
                        <Card.Text style={{ marginBottom: 0}}>{ startDate } { startTime } - </Card.Text>
                        <Card.Text>{ endDate } { endTime }</Card.Text><br/>
                    </div>
                </Card>
            </div>
        )
    }
}

export default ClassCard;