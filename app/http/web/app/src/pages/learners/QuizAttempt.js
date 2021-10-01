import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import Attempt from '../../components/quiz/Attempt';

class QuizAttempt extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <Attempt 
                students = {
                    [
                        { no: 1, score: "10/30", result: false},
                        { no: 2, score: "14/30", result: false },
                        { no: 3, score: "16/30", result: true},
                        { no: 4, score: "20/30", result: true}
                     ]
                }
                />

                
            </Container>
            

        )

    }
}

export default QuizAttempt;