import { React, Component } from 'react';
import { Card } from 'react-bootstrap';

class ClassCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            mouseOver: false,
            enginEmail: "samueltan@allinone.com"
        }
        this.enrol = this.enrol.bind(this);
        this.over = this.over.bind(this);
        this.out = this.out.bind(this);
    }
    enrol(){
        fetch('http://127.0.0.1:5004/' + this.props.courseName + '/' + this.props.classNum, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({enginEmail: this.state.enginEmail, assigned: true })
        })
    }
    over(){
        this.setState({
            mouseOver: true
        })
    }
    out(){
        this.setState({
            mouseOver: false
        })
    }
    render(){
        const { classNum, capacity, startDateTime, endDateTime, trainer } = this.props
        let numSeatsLeft;
        let cardDetails;
        if ( capacity === 0 ){
            numSeatsLeft = <Card.Text style={{ textAlign: 'right', fontStyle:'italic', color:'#B9B9B9' }}>FULL</Card.Text>
        }
        else{
            numSeatsLeft = <Card.Text style={{ textAlign: 'right', fontStyle:'italic', color:'#B9B9B9' }}>{ capacity } left</Card.Text>
        }
        if (this.state.mouseOver === true && this.props.user === "learner"){
            cardDetails = <h5 style={{ marginTop: '40%' }}>
                            Enrol
                        </h5>
        }
        else{
            cardDetails = <div>
                            { numSeatsLeft }
                            <Card.Title style={{ textAlign: 'left', fontStyle:'bold', marginTop:20 }}>Class { classNum }</Card.Title>
                            <Card.Text>{ startDateTime } - { endDateTime }</Card.Text>
                            <Card.Text>Trainer: <br/>{ trainer }</Card.Text>
                        </div>
        }
        
        return(
            <div>
                <button style={{ backgroundColor:'#FFFFFF', border: '0px' }} onClick={ this.enrol } onMouseOver={ this.over } onMouseOut={ this.out }>
                    <Card style={{ width: '15rem', height: '15.5rem', backgroundColor:'#ECF6FF', borderRadius: '25px', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)' }}>
                        <div style={{ padding: 20 }}>
                            { cardDetails }
                        </div>
                    </Card>
                </button>
            </div>
        )
    }
}

export default ClassCard;