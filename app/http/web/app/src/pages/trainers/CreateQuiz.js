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
            allQuizzes: [],
            quizDuration: 1,
            courseNameState : "",
            classNoState: "",
            chapterNumState: 0,
            chapterNameState: "",
            quizIDstate: "",
            chapterTitle:  window.location.href.split('/')[7],

        };
        this.createChapterRow = this.createChapterRow.bind(this);
        this.secondPage = this.secondPage.bind(this);
        this.createMcq = this.createMcq.bind(this);
        this.createTF = this.createTF.bind(this);
        this.creationDone = this.creationDone.bind(this);
        this.cancelCreation = this.cancelCreation.bind(this);
    }

    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = parseInt(tokenString[5]);
        let chapterNum = parseInt(tokenString[6]);
        let chapterName = tokenString[7];
        let quizid = Math.floor(1000 + Math.random() * 8000).toString();   
 
        this.setState({
            courseNameState: courseName,
            classNoState: classNum,
            chapterNameState: chapterName,
            quizIDstate: quizid,
            chapterNumState: chapterNum
        }) 
    }

    secondPage(){
        this.setState({
            firstPage: false,
        }) 
        this.createChapterRow();
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
        let quizNum = 0
        let quizQuestionArray = {"data":[]}
        let optionArray = {"data":[]}
        let selectedOption = {}

        const formData = new FormData(document.getElementById("test"));
        
        for (var [key, value] of formData.entries()) { 

            
            if (key.split("_")[0] === "question"){
                quizNum += 1
                if (key.split("_")[1] === "mcq"){
                    quizQuestionArray["data"].push({"question":value,"question_no":quizNum,"question_type":"mcq"})
                } else if (key.split("_")[1] === "t/f"){
                    quizQuestionArray["data"].push({"question":value,"question_no":quizNum,"question_type":"t/f"})
                }
            }
            if (key.split("_")[0] === "selected"){
                selectedOption[key.split("_")[1]] = value
            }
        }

        for (var [key, value] of formData.entries()) { 
            
            if (key.split("_")[0] === "option"){
                console.log(key.split("_")[2])
                console.log("----------------")
                let questionNo = key.split("_")[2]
                let optionNo = key.split("_")[1]
                if (selectedOption[questionNo] === value && optionNo === 1){
                    optionArray["data"].push({"optionNo":optionNo,"question_no":questionNo,"option_value":value, "selected":1, "answer": 1}) 
                } else if (optionNo === 1 ){
                    optionArray["data"].push({"optionNo":optionNo,"question_no":questionNo,"option_value":value, "selected":1, "answer": 0}) 
                } else if (selectedOption[questionNo] === value) {
                    optionArray["data"].push({"optionNo":optionNo,"question_no":questionNo,"option_value":value, "selected":0, "answer": 1}) 
                } else {
                    optionArray["data"].push({"optionNo":optionNo,"question_no":questionNo,"option_value":value, "selected":0, "answer": 0}) 
                }
            }
             
        }

        fetch('http://127.0.0.1:5008/'  + this.state.courseNameState + '/' + this.state.classNoState + "/" + this.state.chapterTitle + "/"  + this.state.quizIDstate + "/" +  quizNum + "/" + this.state.quizDuration, {
            method: "POST",   
        })
        .then(
            fetch('http://127.0.0.1:5009/'  + this.state.quizIDstate, {
                method: "POST",   
                body:  JSON.stringify(quizQuestionArray),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        )
        .then(
            fetch('http://127.0.0.1:5013/'  + this.state.quizIDstate, {
            method: "POST",   
            body:  JSON.stringify(optionArray),
            headers: {
                'Content-Type': 'application/json',
            }
            })
        )

        event.preventDefault();
        window.location.href = "http://localhost:3000/trainers-course/" + this.state.courseNameState + "/" + this.state.classNoState

    }
    createChapterRow(){
        fetch('http://127.0.0.1:5006/' + this.state.courseNameState + '/' + this.state.classNoState + '/' + this.state.chapterNumState + '/' + this.state.chapterTitle, {
            method: "POST",
        })
    }

    cancelCreation(){
        window.location.href = "http://localhost:3000/trainers-course/" + this.state.courseNameState + "/" + this.state.classNoState
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
                                    <input type="text" readonly class="form-control-plaintext" id="quizTitle" value={" " + this.state.chapterTitle}/>
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
                                <button type="button" class="btn btn-secondary" onClick={ this.cancelCreation }>Cancel</button>
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
                                <h1> Quiz { this.state.chapterNumState } - { this.state.courseNameState } </h1>
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