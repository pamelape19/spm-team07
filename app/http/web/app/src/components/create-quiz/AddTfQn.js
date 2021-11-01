import { Component } from "react";
import { Container } from "react-bootstrap";

import '../../pages/trainers/css/createQuiz.css';

class AddTfQn extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: "",
            option1: "",
            option2: "",
        }
    }
    render(){
        const { qnNo } = this.props;
        const { text, option1, option2} = this.state
        return(
            <div>
                <Container className="quiz-creation">
                    { qnNo }. <input type="text" placeholder="Enter question" className="mcq-spaced-options qns-and-options-input" name={"question_t/f_" + qnNo}  
                                 value={text} onChange={e => this.setState({ text: e.target.value  })} />
                    <Container>
                    <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option1"} value="true"   name={"selected_" + qnNo}  />
                            {"  "}
                            <label class="form-check-label" for={qnNo + "option1"} >
                                <input type="text" className="qns-and-options-input" value="true" name={"option_1_" + qnNo} readonly="readonly" />
                            </label>
                            <label for={qnNo + "option1"} className="set-ans">Set as correct answer</label>
                        </div>
                        <div class="form-check" className="mcq-spaced-options">
                            <input class="form-check-input" type="radio" name="mcqRadios" id={qnNo + "option2"} value="false" name={"selected_" + qnNo}/>
                            {"  "}
                            <label class="form-check-label" for={qnNo + "option2"} >
                            <input type="text" className="qns-and-options-input" value="false" name={"option_2_" + qnNo} readonly="readonly" />  
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