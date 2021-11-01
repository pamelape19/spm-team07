import { React, Component } from 'react';
import { Container } from 'react-bootstrap';

import Correct from '../../resources/green-check.png';
import Cross from '../../resources/cross.png';

class ChapterQn extends Component{
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
    showAns = ( option ) => {

        if (this.props.showAnswer === true && this.state.correctAnswerRecorded === false){
            if (option === this.props.answer){
                return (
                    <img src={ Correct } alt="" style={{ width: 30 }}/>
                )
            }
            else if (option === this.state.selectAns){
                return (
                    <img src={ Cross } alt="" style={{ width: 30 }}/>
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
    handleChange = (e) =>{
        this.setState({
            selectAns: e.target.value,
        })
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
                <Container style={{ padding: '3%' }}>
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

export default ChapterQn;