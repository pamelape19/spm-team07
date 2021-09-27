import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            correctAnswerRecorded: false,
            negativeAnswerRecorded: false
        };

    };
    handleChange = (e) =>{
        var score = 0;
        if (e.target.value == this.props.answer){
            if (this.state.correctAnswerRecorded === false){
                if (this.props.applyNegativeMarking === true && this.state.negativeAnswerRecorded === true){
                    score = 1 + this.props.marks;
                } else{
                    score = this.props.marks;
                }
            }
            this.state.correctAnswerRecorded = true;
            this.state.negativeAnswerRecorded = false;
        }
        else {				
            if( this.props.applyNegativeMarking === true && this.state.negativeAnswerRecorded === false ) {
                if( this.state.correctAnswerRecorded === true ) {
                    score = -1 - this.props.marks;
                } else {
                    score = -1;	
                }
                
            } else {
                if( this.state.correctAnswerRecorded === true ) {
                    score = -this.props.marks;
                } 
            }
            this.state.negativeAnswerRecorded = true;
            this.state.correctAnswerRecorded = false;
        }
        this.props.onAnswered(score);
    }
    render(){
        const qname = "option" + this.props.number;
        const qoptions = this.props.options.map((option) =>
            <div>
                <input type="radio" 
                    name={qname} 
                    value={option} 
                    onChange={(e)=>this.handleChange(e)}
                />
                    &nbsp;{option}
            </div>
        )
        return(
            <div>
                <Container style={{padding: '5%'}}>
                    <div style={{textAlign: 'left'}}>
                        <strong>Q{this.props.number}</strong>: {this.props.question}
                    </div>
                    <div style={{textAlign: 'left', marginLeft: '6%'}}>
                        {qoptions}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Question;