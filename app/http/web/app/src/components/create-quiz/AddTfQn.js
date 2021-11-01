import { Component } from "react";
import { Container } from "react-bootstrap";

import '../../pages/trainers/css/createQuiz.css';

class AddTfQn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { qnNo } = this.props;
        return(
            <div>
                <Container className="quiz-creation">
                    { qnNo }. <input type="text" placeholder="Enter question" className="mcq-spaced-options qns-and-options-input" name={qnNo}/>
                    <Container>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option1"} value="option1" name={qnNo} />
                            {"  "}
                            <label class="form-check-label" for={qnNo + "option1"} >
                                True
                            </label>
                            <label for={qnNo + "option1"} className="set-ans">Set as correct answer</label>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option2"} value="option2" name={qnNo}/>
                            {"  "}
                            <label class="form-check-label" for={qnNo + "option2"} >
                                False  
                            </label>
                            <label for={qnNo + "option2"} className="set-ans">Set as correct answer</label>
                        </div>
                   </Container>
                </Container>
            </div>
        )
    }
}

export default AddTfQn;