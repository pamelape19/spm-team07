import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import AddMcqQn from '../../components/create-quiz/AddMcqQn';
import AddTfQn from '../../components/create-quiz/AddTfQn';

import './css/createQuiz.css';

class CreateQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstPage: true,
            totalQuestions: 0,
            questionTypes: []
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
        this.setState({
            totalQuestions: this.state.totalQuestions + 1,
            questionTypes: [...this.state.questionTypes, "mcq"]
        })
    }
    createTF(){
        this.setState({
            totalQuestions: this.state.totalQuestions + 1,
            questionTypes: [...this.state.questionTypes, "tf"]
        })
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
                                <button type="submit" class="btn btn-primary" onClick={ this.secondPage }>Create</button>
                            </div>
                        </form>
                    </Container>
        }
        else{
            // let questionsCreated;
            const questionType = this.state.questionTypes.map(
                
                (questionType, idx) => {
                    if(questionType === 'mcq')
                        return (<AddMcqQn qnNo = { idx + 1 }/>)
                    return (<AddTfQn qnNo = { idx + 1 }/>)
                }
            )
                    
            page = <div>
                <div className="sticky-top">
                    <Container className="create-quiz-header">
                        <div>
                            <h1> Quiz 1 - Introduction to 3D Printing </h1>
                            <p> Estimated Length: 30 mins</p>
                        </div>
                        <div className="creation-done-btn">
                            <button type="submit" class="btn btn-primary">Done</button>
                        </div>
                    </Container>
                    <hr/>
                </div>
                { questionType }
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
            </div>
        )
    }
}

export default CreateQuiz;