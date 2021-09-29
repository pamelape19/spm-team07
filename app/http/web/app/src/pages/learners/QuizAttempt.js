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
                        { no: 1, score: 21, percentage: 30},
                        { no: 2, score: 19, percentage: 40 },
                        { no: 3, score: 16, percentage: 50},
                        { no: 4, score: 25, percentage: 60}
                     ]
                }
                />

                
            </Container>
            

        )

    }
}

export default QuizAttempt;