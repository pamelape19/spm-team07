import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import "./css/chapterQuiz.css";
import McqQn from '../../components/quiz/McqQn';


class ChapterQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            quizQnOptions:[],
            quiz_questions: [],
            CourseNameState: "",
            ClassNumState: "",
            ChapterNameState: "",
            quizIDState: "3003",
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");

        let tokenWordsChapterName =  tokenString[5].split('%20');
        let chapterName = tokenWordsChapterName.join(" ");    
        let classNum = tokenString[6];

        this.setState({
            CourseNameState: courseName,
            ClassNumState: classNum,
            ChapterNameState: chapterName,
        })


        fetch('http://127.0.0.1:5000/quiz_question/' + this.state.quizIDState)
        .then(res => res.json())
        .then(result => {
            // since quiz options are concatenated, need to clear the array when it's a new question
            this.setState({
                quizQnOptions: []
            })
            let allQuizQuestions = result.data.quizQns;
            
            allQuizQuestions.map((quizQuestion) => {
                fetch('http://127.0.0.1:5000/quiz_option/' + this.state.quizIDState)
                .then(res => res.json())
                .then(result => {
                    
                    let allQuizOptions = result.data.quizOptions;
                    // get all quiz options for a specific question
                    allQuizOptions.map((quizOption) => {  
                        if (quizOption.questionNo === quizQuestion.questionNo){
                            this.setState({
                                    quizQnOptions: [...this.state.quizQnOptions, quizOption.option_value]
                                }); 
                            }
                        // else condition needed for qns that have no options in the db, so that 'quiz_question.quizOptions[0].option_value' below will not return an error due to empty array
                        else{
                            this.setState({
                                quizQnOptions: ["no value in db", "no value in db", "no value in db", "no value in db"]
                            })
                        }
                    });
                    // fill quiz_questions array with question data and their respective options
                    this.setState({
                        quiz_questions: [...this.state.quiz_questions, 
                            {
                                'qnNo': quizQuestion.questionNo, 
                                'qn': quizQuestion.question, 
                                'qnType': quizQuestion.question_type, 
                                'quizID': this.state.quizIDState,
                                'quizOptions': this.state.quizQnOptions
                            }]
                    });

                });
            })
        })
    }

    render(){
        const{ quiz_questions } = this.state;

            return( 
                <div>
                    <div className="chapter-quiz-sticky-top">
                        <Container className="chapter-quiz-header">
                            <h1> Quiz 1 - Introduction to 3D Printing </h1>
                            <p> Estimated Length: 30 mins</p>
                        </Container>
                        <hr/>
                    </div>

                    <Container className = "chapter-quiz-questions">
 
                    {quiz_questions.map((quiz_question)=>{

                            if (quiz_question.qnType === "t/f")
                                return (<McqQn qn_no = { quiz_question.qnNo } qn = {quiz_question.qn} options = {[ "True" , "False"]} />)
                            else
                                return (<McqQn qn_no = { quiz_question.qnNo } qn = {quiz_question.qn} options = {[ quiz_question.quizOptions[0], quiz_question.quizOptions[1], quiz_question.quizOptions[2], quiz_question.quizOptions[3]]} />)
                    
                    })}

                    <div className = "chapter-quiz-buttons">
                        <div></div>
                        <Button type="submit" variant="secondary" >Save</Button>{' '}
                        <Button type="submit">Submit</Button>{' '}
                    </div>   

                    </Container>
                </div>
            )
        

    }
}

export default ChapterQuiz;