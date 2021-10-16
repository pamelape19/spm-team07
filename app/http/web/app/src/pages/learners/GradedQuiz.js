import {React, Component } from 'react';
import Test from '../../components/quiz/Test';

class GradedQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseNameState: "",
            classNumState: 0
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
    }
    render(){
        return(
            <div>
                <Test 
                    name = "Final Quiz"
                    courseName = { this.state.courseNameState }
                    classNum = { this.state.classNumState }
                    time = {30}
                    description = "This is a sample test paper to demonstrate the ReactJS UI design by components"
                    passCutoff = {0.5}
                    applyNegativeMarking = {false}
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
                                ans : "Sonia Gandhi",
                                marks : 4
                            },
                            {
                                no : "3",
                                qtext : "Who is Prime Minister of India?",
                                options : ["Sonia Gandhi", "Narendra Modi", "Manmohan Singh", "Rahul Gandhi"],
                                ans : "Sonia Gandhi",
                                marks : 4
                            },
                            {
                                no : "4",
                                qtext : "Who is Prime Minister of India?",
                                options : ["Sonia Gandhi", "Narendra Modi", "Manmohan Singh", "Rahul Gandhi"],
                                ans : "Sonia Gandhi",
                                marks : 4
                            }
                        ]
                    }
                />
                
            </div>
        )
    }
}
export default GradedQuiz;



