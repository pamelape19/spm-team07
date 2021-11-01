import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import "./css/chapterQuiz.css";
import ChapterQn from '../../components/quiz/ChapterQn';

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
            showAnswer: false,
            hideDoneBtn: true,
            ans: ''
        }
        this.handleSubmitted = this.handleSubmitted.bind(this);
    }
    
    handleSubmitted(){
        this.setState({
            showAnswer: true,
            hideDoneBtn: false
        })
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

        fetch('http://127.0.0.1:5008/' + courseName + '/' + classNum)
        .then(res => res.json())
        .then(result => {
            let course_quizzes = result.data.courseQuizzes;
            course_quizzes.map((course_quiz)=>{
                if (course_quiz.chapter_name === chapterName){
                    fetch('http://127.0.0.1:5009/' +  course_quiz.quizID)

                    .then(res => res.json())
                    .then(result => {

                        let allQuizQuestions = result.data.quizQns;
                        
                        allQuizQuestions.map((quizQuestion) => {
                            fetch('http://127.0.0.1:5013/' +  course_quiz.quizID)
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
        const { quiz_questions } = this.state;
         
        let btnShown;
        {btnShown = <form>
        <input type="button"
            className="btn btn-primary" 
            value="Submit" 
            onClick={ this.handleSubmitted }
        />
        </form>}

        const questionAnswers = quiz_questions.map((question) =>
            <ChapterQn
                question = { question.qtext }
                number = { question.no } 
                options = { question.options } 
                answer = { question.ans } 
                showAnswer = { this.state.showAnswer }
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

                    </Container> 
                </div>
            )
        
    }
}

export default ChapterQuiz;