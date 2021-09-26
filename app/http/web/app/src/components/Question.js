import { React, Component } from 'react';

class Question extends Component{
    constructor(props){
    super(props);
    this.state = {
        correctAnswerRecorded: false,
        negativeAnswerRecorded: false
    }
    this.handleChange = this.handleChange.bind(this);

    } // end of constructor
    handleChange(score){
        var score = 0;
        if( score.target.value == this.props.answer) {				
            if( this.state.correctAnswerRecorded === false ) {					
                if( this.props.applyNegativeMarking === true && this.state.negativeAnswerRecorded === true ) {
                    score = 1 + this.props.marks;
                } else {
                    score = this.props.marks;
                }
            }				
            this.state.correctAnswerRecorded = true;
            this.state.negativeAnswerRecorded = false;
        } else {				
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
        var qname = "option" + this.props.number;
        var qoptions = this.props.options.map(option=>{
            <div><input type="radio" name={qname} value={option.text} onChange={this.handleChange}/>&nbsp;{option.text}</div>
        }, this);
        return(
            <div>
                <div><strong>Q</strong>: {this.props.question}</div>
                <div>{qoptions}</div>
                <br/>
            </div>
        );
    }
}

export default Question