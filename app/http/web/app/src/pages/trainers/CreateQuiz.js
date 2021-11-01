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
            questionTypes: [],
            quizDuration: 1,
            courseNameState: '',
            CNoState: '',
            chapterNameState: ''
        };
        this.secondPage = this.secondPage.bind(this);
        this.createMcq = this.createMcq.bind(this);
        this.createTF = this.createTF.bind(this);
        this.creationDone = this.creationDone.bind(this);
        this.cancelCreation = this.cancelCreation.bind(this);
        this.updateQuizDuration = this.updateQuizDuration.bind(this);
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
    creationDone(event){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = tokenString[5];
        let chapterTitle = tokenString[6]
        let chapterNo= tokenString[7]


        const formData = new FormData(document.getElementById("test"));
        formData.append
        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
           }

        console.log(JSON.stringify({
            formData
        }))


        

        console.log('http://127.0.0.1:5008/' + courseName + '/' + classNum + "/" + chapterTitle + "/" + chapterNo )
        fetch('http://127.0.0.1:5008/'  + courseName + '/' + classNum + "/" + chapterTitle + "/" + chapterNo  ,{
            method: "POST",   
            body:
                formData
            ,
  
        })
        event.preventDefault();

        // window.location.reload(false)

        // window.location = "http://localhost:3000/trainers-course"
    }
    cancelCreation(){
        // window.location = "http://localhost:3000/trainers-course"
    }
    updateQuizDuration(value){
        this.setState({
            quizDuration: value
        })
    }


    render(){
        let page;
        if ( this.state.firstPage === true ){
            page = <Container className="quiz-creation">
                        <h1>Quiz Creation</h1>
                        <form className="quiz-form" id="test">
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
                                    <input type="number" 
                                        class="form-control" 
                                        id="duration"
                                        min="1" 
                                        placeholder="Please enter quiz duration"
                                        onChange={ e => this.updateQuizDuration(e.target.value)}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="create-btn">
                                <div></div>
                                <button  type="submit" class="btn btn-secondary" onClick={ this.cancelCreation }>Cancel</button>
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
                    
            page = 
            <form id="test" onSubmit={ this.creationDone }>
                
                <div>
                    <div className="sticky-top">
                        <Container className="create-quiz-header">
                            <div>
                                <h1> Quiz 1 - Introduction to 3D Printing </h1>
                                <p> Estimated Length: { this.state.quizDuration } mins</p>
                            </div>
                            <div className="creation-done-btn">

                                <button type="submit" class="btn btn-primary" onClick={ this.creationDone }>Done</button>
                            </div>
                        </Container>
                        <hr/>
                    </div>
                    { questionType }
                    <Container className="quiz-creation">
                        <div className="mcq-btns">
                            <div class="btn btn-primary" onClick={ this.createMcq }>+ Create question with MCQ options</div>
                            <div class="btn btn-primary" onClick={ this.createTF }>+ Create question with T/F options</div>
                        </div>
                    </Container>
                </div>
            </form>
            
        }
        return(
            <div style={{ margin: '8% 0' }}>
                 
                { page }
                 

            </div>
        )
    }
}

export default CreateQuiz;