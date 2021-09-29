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
                        { id: 1, score: 21 },
                        { id: 2, score: 19 },
                        { id: 3, score: 16 },
                        { id: 4, score: 25 }
                     ]
                }
                />

                
            </Container>
            

        )

    }
}

export default QuizAttempt;