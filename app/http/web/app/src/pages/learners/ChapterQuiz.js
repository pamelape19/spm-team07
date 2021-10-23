import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import "./css/chapterQuiz.css";
import McqQn from '../../components/quiz/McqQn';
import Question from '../../components/quiz/Question';

class ChapterQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            quizQnOptions:[],
            quiz_questions: [],
            CourseNameState: "",
            ClassNumState: "",
            ChapterNameState: "",
            quizID: "",
            totalscore: 0,
            totalmarks: 0,
            showAnswer: false,
            hideDoneBtn: true,
            ans: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
    }

    handleChange = (score) => {
        this.setState({ 
            totalscore: this.state.totalscore + score
        });
        console.log(this.state.totalscore)
      }
    
    handleSubmitted(){
        // aaa 
        var result = this.state.totalscore;
        this.setState({
            showAnswer: true,
            hideDoneBtn: false
        })
        if (result > (this.state.totalmarks/2)){
            var pass = true
        } 
        else{
            var pass = false
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

        fetch('http://127.0.0.1:5000/quiz/' + courseName + '/' + classNum)
        .then(res => res.json())
        .then(result => {
            let course_quizzes = result.data.courseQuizzes;
            course_quizzes.map((course_quiz)=>{
                if (course_quiz.chapter_name === chapterName){
                    fetch('http://127.0.0.1:5000/quiz_question/' +  course_quiz.quizID)

                    .then(res => res.json())
                    .then(result => {

                        let allQuizQuestions = result.data.quizQns;
                        
                        allQuizQuestions.map((quizQuestion) => {
                            fetch('http://127.0.0.1:5000/quiz_option/' +  course_quiz.quizID)
                            .then(res => res.json())
                            .then(result => {
                                // since quiz options are concatenated, need to clear the array when it's a new question
                                this.setState({
                                    quizQnOptions: []
                                })

                                let allQuizOptions = result.data.quizOptions;
                                // get all quiz options for a specific question
                                allQuizOptions.map((quizOption) => {  
                                    if (quizOption.questionNo === quizQuestion.questionNo){
                                        this.setState({
                                            quizQnOptions: [...this.state.quizQnOptions, quizOption.option_value]
                                        }); 
                                        if (quizOption.answer === true)
                                            this.setState({
                                                ans: quizOption.option_value
                                            })
                                    }
                                });
                                                          
                                // let allQuizOptions = result.data.quizOptions;
                                // // get all quiz options for a specific question
                                // allQuizOptions.map((quizOption) => {  
                                //     if (quizOption.questionNo === quizQuestion.questionNo){
                                //         this.setState({
                                //                 quizQnOptions: [...this.state.quizQnOptions, quizOption.option_value]
                                //             }); 
                                //         }
                                // });
                                // fill quiz_questions array with question data and their respective options
                                this.setState({
                                    quiz_questions: [...this.state.quiz_questions, 
                                        {
                                            'no': quizQuestion.questionNo, 
                                            'qtext': quizQuestion.question, 
                                            'qnType': quizQuestion.question_type, 
                                            'quizID': this.state.quizID,
                                            'options': this.state.quizQnOptions,
                                            'ans': this.state.ans,
                                            'marks': 1
                                        }]
                                });
            
                            });
                        })
                    })

                }
                    
            })
        })

    }

    render(){
        const{ quiz_questions } = this.state;
        if (quiz_questions.length > 0){
            console.log(quiz_questions)
            var totalmarks = 0;
            const marksArray = quiz_questions.map( (question) => question.marks );
            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            totalmarks = marksArray.reduce(reducer);
        }
         

        let btnShown;
        {btnShown = <form>
        <input type="button"
            className="btn btn-primary" 
            value="Submit" 
            onClick={ this.handleSubmitted }
        />
        </form>}



        
        const questionAnswers = quiz_questions.map((question) =>
            <Question 
                question = { question.qtext }
                number = { question.no } 
                options = { question.options } 
                answer = { question.ans } 
                marks = { question.marks } 
                applyNegativeMarking = { false } 
                onAnswered = { (score)=>this.handleChange(score) }
                showAnswer = { this.state.showAnswer }
                totalscore = { this.state.totalscore }
                totalmarks = { this.state.totalmarks }
            />
        );

            return( 
                <div style={{marginBottom: '3%'}}>
                    <div className="chapter-quiz-sticky-top">
                        <Container className="chapter-quiz-header">
                            <h1> Quiz - { this.state.CourseNameState } </h1>
                            <p> Chapter Name: { this.state.ChapterNameState } </p>
                        </Container>
                        <hr/>
                    </div>


                     <Container className = "chapter-quiz-questions">
                        { questionAnswers }
                        { btnShown }
                        
                    {/* {quiz_questions.map((quiz_question)=>{

                            if (quiz_question.qnType === "t/f")
                                return (<McqQn qn_no = { quiz_question.no } qn = {quiz_question.qtext} options = {[ quiz_question.quizOptions[0], quiz_question.quizOptions[1] ]} />)
                            else
                                return (<McqQn qn_no = { quiz_question.no } qn = {quiz_question.qtext} options = {[ quiz_question.quizOptions[0], quiz_question.quizOptions[1], quiz_question.quizOptions[2], quiz_question.quizOptions[3]]} />)
               
                    })}
                    <div className = "chapter-quiz-buttons">
                        <div></div>
                        <Button type="submit">Submit</Button>{' '}
                        <div></div>
                    </div>    */}

                    </Container> 
                </div>
            )
        

    }
}

export default ChapterQuiz;