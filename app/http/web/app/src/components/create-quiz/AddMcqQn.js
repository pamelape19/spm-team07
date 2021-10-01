import { Component } from "react";
import { Container } from "react-bootstrap";

import '../../pages/trainers/css/createQuiz.css';

class AddMcqQn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { qnNo } = this.props;
        return(
            <div>
                <Container className="quiz-creation">
                    { qnNo }. <input type="text" placeholder="Enter question" className="mcq-spaced-options qns-and-options-input"/>
                    <Container>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id="option1" value="option1" disabled/>
                            {"  "}<label class="form-check-label" for="option1">
                                <input type="text" placeholder="Enter option 1" className="qns-and-options-input"/>
                            </label>
                            <button className="set-ans">Set as correct answer</button>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id="option2" value="option2" disabled/>
                            {"  "}<label class="form-check-label" for="option2">
                                <input type="text" placeholder="Enter option 2" className="qns-and-options-input"/>
                            </label>
                            <button className="set-ans">Set as correct answer</button>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id="option3" value="option3" disabled/>
                            {"  "}<label class="form-check-label" for="option3">
                                <input type="text" placeholder="Enter option 3" className="qns-and-options-input"/>
                            </label>
                            <button className="set-ans">Set as correct answer</button>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id="option4" value="option4" disabled/>
                            {"  "}<label class="form-check-label" for="option4">
                                <input type="text" placeholder="Enter option 4" className="qns-and-options-input"/>
                            </label>
                            <button className="set-ans">Set as correct answer</button>
                        </div>
                   </Container>
                </Container>
            </div>
        )
    }
}

export default AddMcqQn;