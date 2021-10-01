import { React, Component } from 'react';
import { Container } from 'react-bootstrap';

import Correct from '../../resources/green-check.png';
import Cross from '../../resources/cross.png';

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            correctAnswerRecorded: false,
            negativeAnswerRecorded: false,
            selectAns: "",
        };
        this.showAns = this.showAns.bind(this)

    };
    
    // method to show tick or cross after submission of answer
    // var percScore = this.props.totalscore*100 / this.props.totalmarks;
    showAns = ( option ) => {
        if ( (this.props.totalscore*100 / this.props.totalmarks) > 50 ){
            if ( this.props.showAnswer === true && this.state.correctAnswerRecorded){
                if ( option === this.props.answer ){
                    return (
                        <img src={ Correct } alt="" style={{width: 30}}/>
                    )
                }
                else{
                    return(
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    )
                }
            }
        }
        if ( (this.props.totalscore*100 / this.props.totalmarks) > 50 ){
            if (this.props.showAnswer === true && this.state.correctAnswerRecorded === false){
                if (option === this.props.answer){
                    return (
                        <img src={ Correct } alt="" style={{width: 30}}/>
                    )
                }
                else if (option === this.state.selectAns){
                    return (
                        <img src={ Cross } alt="" style={{width: 30}}/>
                    )
                }
                else{
                    return(
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    )
                }
            }
        }
    }
    handleChange = (e) =>{
        this.setState({
            selectAns: e.target.value,
        })

        var score = 0;
        if (e.target.value === this.props.answer){
            if (this.state.correctAnswerRecorded === false){
                if (this.props.applyNegativeMarking === true && this.state.negativeAnswerRecorded === true){
                    score = 1 + this.props.marks;
                } else{
                    score = this.props.marks;
                }
            }
            this.setState({
                correctAnswerRecorded: true,
                negativeAnswerRecorded: false,
            })
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
            this.setState({
                negativeAnswerRecorded: true,
                correctAnswerRecorded: false,
            })
        }
        this.props.onAnswered(score);

        
    }
    render(){
        const qname = "option" + this.props.number;
        const qoptions = this.props.options.map((option) =>
            <div>
                <span>
                    { this.showAns(option) }
                </span>
                <span>
                    {" "}
                    <input type="radio" 
                        name={ qname } 
                        value={ option } 
                        onChange={ (e) => this.handleChange(e) }
                    />
                        &nbsp;{ option }
                </span>
            </div>
        )
        
        return(
            <div>
                <Container style={{ padding: '5%' }}>
                    <div style={{ textAlign: 'left' }}>
                        <strong>Q{ this.props.number }</strong>: { this.props.question }
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: '6%' }}>
                        { qoptions }
                    </div>
                </Container>
            </div>
        )
    }
}

export default Question;