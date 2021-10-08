import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import "./css/chapterQuiz.css";
import McqQn from '../../components/quiz/McqQn';


class ChapterQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            quiz_questions: [],
            isLoaded: false,
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5000/quiz_question')
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                quiz_questions: result.data.quiz_question 
            });
        });
    }
    render(){
        const{quiz_questions, isLoaded} = this.state;

        if (!isLoaded){
            return(<div>Loading</div>)
        } else{
            return(
                <div>
                    <div className="chapter-quiz-sticky-top">
                        <Container className="chapter-quiz-header">
                            <h1> Quiz 1 - Introduction to 3D Printing </h1>
                            <p> Estimated Length: 30 mins</p>
                        </Container>
                        <hr/>
                    </div>




                    <Container className = "chapter-quiz-questions">


                    {quiz_questions.map((quiz_question)=>(


                    <McqQn qn_no = { quiz_question.questionNo } qn = {quiz_question.question} options = {["lorem ipsum", "ipsum lorem", "lorem ipsum", "ipsum lorem"]} />

                            ))}


                        <McqQn qn_no = { 1 } qn = "What is 3D Printing?" options = {["lorem ipsum", "ipsum lorem", "lorem ipsum", "ipsum lorem"]} />
                        <McqQn qn_no = { 2 } qn = "3D Printing can print 3D" options = {["True", "False"]}/>
                    <div className = "chapter-quiz-buttons">
                        <div></div>
                        <Button type="submit" variant="secondary" >Save</Button>{' '}
                        <Button type="submit">Submit</Button>{' '}
                    </div>   
                    {/* <div> tset </div>
                    <div>  {quiz_questions[0].course_name} </div>
                    <div>  {console.log(quiz_questions[0])} </div>
                    {quiz_questions.map((quiz_question)=>(
                        <div> {quiz_question.question}</div>
                                ))} */}
                    </Container>
                </div>
            )
        }

    }
}

export default ChapterQuiz;