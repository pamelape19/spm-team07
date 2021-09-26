import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import QuestionPaper from '../../components/QuestionPaper';
import Question from '../../components/Question';
import ScoreCard from '../../components/ScoreCard';
import Stopwatch from '../../components/Stopwatch';
import Test from '../../components/Test';

class GradedQuiz extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className="sticky-top">
                <Container className="header">
                    <h1> Final Quiz </h1>
                    <p> Estimated Length: 30 mins</p>
                </Container>
                <hr/>
                </div>
                {/* <Test time ={1}/> */}
                <Test 
                    name = "Sample Test"
                    time = {1}
                    description = "This is a sample test paper to demonstrate the ReactJS UI design by components"
                    passCutoff = {0.5}
                    applyNegativeMarking = {false}
                    time = {1}
                    questions = {
                        [
                            {
                                no : "1",
                                qtext : "California is in which part of USA?",
                                options : ["East", "Mid", "West", "South"],
                                ans : "West",
                                marks : 3
                            },
                            {
                                no : "2",
                                qtext : "Who is Prime Minister of India?",
                                options : ["Sonia Gandhi", "Narendra Modi", "Manmohan Singh", "Rahul Gandhi"],
                                ans : "West",
                                marks : 3
                            }
                        ]
                    }
                
                
                
                />
                
            </div>
        )
    }
}
export default GradedQuiz;



