import {React, Component } from 'react';
import Test from '../../components/quiz/Test';

class GradedQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            quizQnOptions:[],
            quiz_questions: [],
            courseNameState: "",
            classNumState: 0,
            quizId: "",
            ans: "",
            isLoaded: false,
            qnCount: 0,
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = parseInt(tokenString[5])

        this.setState({
            courseNameState: courseName,
            classNumState: classNum,
        })

        fetch('http://127.0.0.1:5000/quiz/' + courseName + '/' + classNum)
        .then(res => res.json())
        .then(result => {
            let course_quizzes = result.data.courseQuizzes;
            course_quizzes.map((course_quiz)=>{
                if (course_quiz.chapter_name === null){
                    fetch('http://127.0.0.1:5000/quiz_question/' + course_quiz.quizID)
                    .then(res => res.json())
                    .then(result => {
                        let allQuizQuestions = result.data.quizQns;
                        allQuizQuestions.map((quizQuestion) => {
                            
                            fetch('http://127.0.0.1:5000/quiz_option/' + course_quiz.quizID)
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
                                            'options': this.state.quizQnOptions,
                                            'ans': this.state.ans,
                                            'marks': 1
                                        }],
                                    qnCount: this.state.qnCount + 1
                                });
            
                                if (this.state.qnCount === allQuizQuestions.length){
                                    this.setState({
                                        isLoaded: true
                                    })
                                }
                            });
                        })
                    })
                }
            })
        })

        
        
    }
    render(){
        if (this.state.isLoaded === false){
            return(
                <div style={{margin: '10%'}}>
                    <h5>Loading</h5>
                </div>
            )
        }
        else{
            const { courseNameState, classNumState, quiz_questions } = this.state;
            return(
                <div>
                    <Test 
                        name = "Final Quiz"
                        courseName = { courseNameState }
                        classNum = { classNumState }
                        time = {30}
                        description = "This is a sample test paper to demonstrate the ReactJS UI design by components"
                        passCutoff = {0.5}
                        applyNegativeMarking = {false}
                        questions = { quiz_questions }
                    />
                    
                </div>
            )
        }
    }
}
export default GradedQuiz;