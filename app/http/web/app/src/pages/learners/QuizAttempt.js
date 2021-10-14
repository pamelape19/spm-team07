import {React, Component } from 'react';
import { Container } from 'react-bootstrap';
import Attempt from '../../components/quiz/Attempt';

class QuizAttempt extends Component{
    constructor(props){
        super(props);
        this.state = {
            learnerEmail: "josiahkang@allinone.com",
            learnerResults: [],
            quizId: '1002'
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/quiz_results')
        .then(res => res.json())
        .then(result => {
            let quiz_results = result.data.quiz_results;
            const quiz_result = quiz_results.map((quiz_result)=> {
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
                    />

                    
                </Container>
            </div>
            

        )

    }
}

export default QuizAttempt;