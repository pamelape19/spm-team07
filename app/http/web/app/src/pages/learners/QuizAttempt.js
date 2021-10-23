import {React, Component } from 'react';
import { Container } from 'react-bootstrap';
import Attempt from '../../components/quiz/Attempt';

class QuizAttempt extends Component{
    constructor(props){
        super(props);
        this.state = {
            classNumState: 0,
            courseNameState: "",
            learnerEmail: "josiahkang@allinone.com",
            learnerResults: [],
            quizId: ""
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = parseInt(tokenString[5])

        this.setState({
            classNumState: classNum,
            courseNameState: courseName,
        })

        fetch('http://127.0.0.1:5008/' + courseName + '/' + classNum)
        .then(res => res.json())
        .then(result => {
            let course_quizzes = result.data.courseQuizzes;
            course_quizzes.map((course_quiz)=>{
                if (course_quiz.chapter_name === null)
                    this.setState({
                        quizId: course_quiz.quizID
                    })
            })
        })

        fetch('http://127.0.0.1:5010')
        .then(res => res.json())
        .then(result => {
            let quiz_results = result.data.quiz_results;
            quiz_results.map((quiz_result)=> {
                if (quiz_result.engin_email === this.state.learnerEmail && quiz_result.quizID === this.state.quizId){
                    this.setState({
                        learnerResults: [...this.state.learnerResults, {no: quiz_result.attemptNo, score: quiz_result.score, result: quiz_result.outcome}]
                    })
                }
            })
        })
    }
    render(){
        return(
            <div style={{margin: '10% 10%'}}>
                <Container>
                    <Attempt 
                        learnerResults = { this.state.learnerResults }
                        courseName = { this.state.courseNameState }
                    />
                </Container>
            </div>
            

        )

    }
}

export default QuizAttempt;