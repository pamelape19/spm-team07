import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import "./css/chapterQuiz.css";
import McqQn from '../../components/quiz/McqQn';


class ChapterQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            quiz_options: [],
            quiz_questions: [],
            isLoaded: true,
            CourseNameState: "",
            ClassNumState: "",
            ChapterNameState: "",
            quizIDState: "",
            QuestionNumber: {}
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");

        let tokenWordsChapterName =  tokenString[5].split('%20');
        let chapterName = tokenWordsChapterName.join(" ");    

        let classNum = tokenString[6];
        
        console.log(classNum)
        console.log(chapterName)
        console.log(courseName)

        this.setState({
            CourseNameState: courseName,
            ClassNumState: classNum,
            ChapterNameState: chapterName,
            quizIDState: "",
            quiz_questions: []
        })

        fetch('http://127.0.0.1:5000/quiz')
        .then(res => res.json())
        .then(result => {

            let allQuiz = result.data.quiz;
            
            const quiz = allQuiz.map((quiz) => {
                console.log(quiz)
                //  doesnt work coz of null data
            //    && quiz.chapterName == this.state.ChapterNameState
                if (quiz.course_name == this.state.CourseNameState && quiz.CNo == this.state.ClassNumState ){

                    this.setState({
                        
                        // quizIDState: quiz.quizID
                        quizIDState: "1002"
                    })

                    
                }
                

            });

        })

        fetch('http://127.0.0.1:5000/quiz_question')
        .then(res => res.json())
        .then(result => {

            let allQuizQuestions = result.data.quiz_question;
            
            const quizQuestion = allQuizQuestions.map((quizQuestion) => {
            

                if (quizQuestion.quizID == this.state.quizIDState){

                    
                    this.setState({
                        quiz_questions: [...this.state.quiz_questions, quizQuestion]
                    });
                }
                

            });

        })

        fetch('http://127.0.0.1:5000/quiz_option')
        .then(res => res.json())
        .then(result => {

            let allQuizOptions = result.data.quiz_option;
            const QuizOptions = allQuizOptions.map((QuizOptions) => {

                if (QuizOptions.quizID == this.state.quizIDState){
                    // create json dictionary 
                    if (QuizOptions.questionNo in this.state.QuestionNumber){
                        let questionum = QuizOptions.questionNo;
                        this.state.QuestionNumber[questionum] = [...this.state.QuestionNumber[questionum], QuizOptions]
                    } else {
                        let questionum = QuizOptions.questionNo;
                        this.state.QuestionNumber[questionum] = [QuizOptions]
                    }
                    this.setState({
                        quiz_options: [...this.state.quiz_options, QuizOptions]
                    });
                }
            });

            // loop through quiz questions and for question number they will be key passed through to the shitty json array we made 

            this.state.quiz_questions.map((QuizQuestionAddOptions) => {

                // if it exist we will add it into the array
                if (this.state.QuestionNumber[QuizQuestionAddOptions.questionNo] ){
                    QuizQuestionAddOptions["questionOptions"] = this.state.QuestionNumber[QuizQuestionAddOptions.questionNo] 
                }
                console.log(this.state.quiz_questions)
            })

            console.log(this.state.QuestionNumber)
            console.log(this.state.quiz_questions)
            // const quizQuestion = allQuizQuestions.map((quizQuestion) => {
            
            //     console.log(quizQuestion.quizID)
            //     if (quizQuestion.quizID == this.state.quizIDState){

                     
            //         this.setState({
            //             quiz_questions: [...this.state.quiz_questions, quizQuestion]
            //         });
            //     }
                
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            // });
            // console.log(this.state.quiz_questions)

        })

    }
    renderQuestions({object,questiontype}) {
        console.log(object)
        console.log("cowoftgasuikefbsfguisbuikfe")
        if (questiontype == "t/f") {
          return( <McqQn qn_no = { object.questionNo } qn = {object.question} options = {[object.QuestionNumber[1].Option_value, object.QuestionNumber[2].Option_value]} /> )
        } else {
            return( <McqQn qn_no = { object.questionNo } qn = {object.question} options = {[object.QuestionNumber[1].Option_value, object.QuestionNumber[2].Option_value,object.QuestionNumber[3].Option_value, object.QuestionNumber[4].Option_value ]} /> )
        }
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
                            // if qus type true display something if false display something else
                        
                            if (quiz_question === "t/f") ? {
                                <McqQn qn_no = { quiz_question.questionNo } qn = {quiz_question.question} options = {["lorem ipsum", "ipsum lorem", "lorem ipsum", "ipsum lorem"]} />
                            }
                             
                        // <div>
                        //     {this.renderQuestions(quiz_question,quiz_question.Question_type )}
                        //     {/* <McqQn qn_no = { quiz_question.questionNo } qn = {quiz_question.question} options = {["lorem ipsum", "ipsum lorem", "lorem ipsum", "ipsum lorem"]} /> */}
                        // </div>

                    
                            ))}

                        {/* <McqQn qn_no = { 1 } qn = "What is 3D Printing?" options = {["lorem ipsum", "ipsum lorem", "lorem ipsum", "ipsum lorem"]} />
                        <McqQn qn_no = { 2 } qn = "3D Printing can print 3D" options = {["True", "False"]}/> */}
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