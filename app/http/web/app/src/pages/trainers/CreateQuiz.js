import { React, Component } from 'react';
import { Container } from 'react-bootstrap';

import './css/createQuiz.css';

class CreateQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstPage: true,
            totalQuestions: 0
        };
        this.secondPage = this.secondPage.bind(this);
        this.createMcq = this.createMcq.bind(this);
        this.createTF = this.createTF.bind(this);
    }
    secondPage(){
        this.setState({
            firstPage: false,
        })
    }
    createMcq(){

    }
    createTF(){

    }
    render(){
        let page;
        if ( this.state.firstPage === true ){
            page = <Container className="quiz-creation">
                        <h1>Quiz Creation</h1>
                        <form className="quiz-form">
                            <div className="quiz-row">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Title</label>
                                    <div class="col-sm-9">
                                    <input type="text" readonly class="form-control-plaintext" id="quizTitle" value={" "+"Chapter 1 - What is 3D Printing?"}/>
                                    </div>
                                </div>
                            </div>
                            <div className="quiz-row">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Duration (min)</label>
                                    <div class="col-sm-9">
                                    <input type="number" class="form-control" id="duration" placeholder="Enter duration of quiz"/>
                                    </div>
                                </div>
                            </div>
                            <div className="create-btn">
                                <div></div>
                                <button type="submit" class="btn btn-primary" onClick={this.secondPage}>Create</button>
                            </div>
                        </form>
                    </Container>
        }
        else{
            page = <div>
                <div className="sticky-top">
                    <Container className="create-quiz-header">
                        <div>
                            <h1> Quiz 1 - Introduction to 3D Printing </h1>
                            <p> Estimated Length: 30 mins</p>
                        </div>
                        <div className="done-btn">
                            <button type="submit" class="btn btn-primary">Done</button>
                        </div>
                    </Container>
                    <hr/>
                </div>
                <Container className="quiz-creation">
                    <div className="mcq-btns">
                        <button class="btn btn-primary" onClick={ this.createMcq }>+ Create question with MCQ options</button>
                        <button class="btn btn-primary" onClick={ this.createTF }>+ Create question with T/F options</button>
                    </div>
                </Container>
            </div>
        }
        return(
            <div style={{ margin: '8% 0' }}>
                { page }

                <center>INCOMPLETE</center>
                <Container className="quiz-creation">
                    1. <input type="text" placeholder="Enter question"/>
                    <Container>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mcqRadios" id="option1" value="option1" disabled/>
                        <label class="form-check-label" for="option1">
                            <input type="text" placeholder="Enter option 1"/>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mcqRadios" id="option2" value="option2" disabled/>
                        <label class="form-check-label" for="option2">
                            <input type="text" placeholder="Enter option 2"/>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mcqRadios" id="option3" value="option3" disabled/>
                        <label class="form-check-label" for="option3">
                            <input type="text" placeholder="Enter option 3"/>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="mcqRadios" id="option4" value="option4" disabled/>
                        <label class="form-check-label" for="option4">
                            <input type="text" placeholder="Enter option 4"/>
                        </label>
                    </div>
                    </Container>
                </Container>
            </div>
        )
    }
}

export default CreateQuiz;