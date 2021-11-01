import { Component } from "react";
import { Container } from "react-bootstrap";

import '../../pages/trainers/css/createQuiz.css';

class AddMcqQn extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
        }
    }
    render(){
        const { qnNo } = this.props;
        const { text, option1, option2 , option3 , option4} = this.state
        return(
            <div>
                 {text}
                <Container className="quiz-creation">
                    { qnNo }. <input type="text" placeholder="Enter question" className="mcq-spaced-options qns-and-options-input" name={"question_mcq" + qnNo}  
                                 value={text} onChange={e => this.setState({ text: e.target.value  })} />
                    <Container>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option1"} value={option1 + ""} name={"selected" + qnNo}  />
                            {"  "}<label class="form-check-label" for="option1">
                                <input type="text" placeholder="Enter option 1" className="qns-and-options-input" value={option1} onChange={e => this.setState({ option1: e.target.value })} name={"option" + qnNo} />
                            </label>
                            <label for={qnNo + "option1"}  className="set-ans">Set as correct answer</label>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option2"} value= {option2} name={"selected" + qnNo}/>
                            {"  "}<label class="form-check-label" for="option2">
                                <input type="text" placeholder="Enter option 2" className="qns-and-options-input" value={option2} onChange={e => this.setState({ option2: e.target.value })} name={"option" + qnNo}/>
                            </label>
                            <label  for={qnNo + "option2"} className="set-ans">Set as correct answer</label>

                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option3"} value= {option3} name={"selected" + qnNo}/>
                            {"  "}<label class="form-check-label" for="option3">
                                <input type="text" placeholder="Enter option 3" className="qns-and-options-input" value={option3} onChange={e => this.setState({ option3: e.target.value })} name={"option" + qnNo}/>
                            </label>
                            <label for={qnNo + "option3"} className="set-ans">Set as correct answer</label>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option4"} value={option4} name={"selected" + qnNo} />
                            {"  "}<label class="form-check-label" for="option4">
                                <input type="text" placeholder="Enter option 4" className="qns-and-options-input" value={option4} onChange={e => this.setState({ option4: e.target.value })} name={"option" + qnNo} />
                            </label>
                            <label  for={qnNo + "option4"} className="set-ans">Set as correct answer</label>
                        </div>
                   </Container>
                </Container>
            </div>
        )
    }
}

export default AddMcqQn;