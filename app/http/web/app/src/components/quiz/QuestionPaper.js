import { React, Component } from 'react';
import {Button } from 'react-bootstrap';
import Question from './Question';
import './css/test.css';
import QuizAttempt from '../../pages/learners/QuizAttempt';

class QuestionPaper extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalscore: 0,
            timeElapsed: this.props.timeAllotted,
            showAnswer: false,
            hideDoneBtn: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.tick = this.tick.bind(this);
    }
    handleChange = (score) => {
        this.setState({ 
            totalscore: this.state.totalscore + score
        });
        console.log(this.state.totalscore)
      }
    handleSubmitted(){
        var result = this.state.totalscore;
        this.props.onSubmitted( result );			
        clearInterval( this.interval );
        this.setState({
            showAnswer: true,
            hideDoneBtn: false
        })
        if (result > (this.props.totalmarks/2)){
            var pass = true
        } 
        else{
            var pass = false
        }
        fetch('http://127.0.0.1:5000/quiz_results/' + this.props.quizId, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({result: result, enginEmail: this.props.enginEmail, totalqns: this.props.totalmarks, outcome: pass})
        })
    }
    tick(){
        if( this.state.timeElapsed > 0 ) {
            this.setState({
                timeElapsed: ( (60*this.state.timeElapsed - 1)/60 ).toFixed(2)
            });  
            this.props.onTimeChange( this.state.timeElapsed );
        } else {
            var result = this.state.totalscore;
            this.props.onSubmitted( result );			
        }
    }
    componentDidMount(){
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        
        const questionAnswers = this.props.questions.map((question) =>
            <Question 
                question = { question.qtext }
                number = { question.no } 
                options = { question.options } 
                answer = { question.ans } 
                marks = { question.marks } 
                applyNegativeMarking = { this.props.applyNegativeMarking } 
                onAnswered = { (score)=>this.handleChange(score) }
                showAnswer = { this.state.showAnswer }
                totalscore = { this.state.totalscore }
                totalmarks = { this.props.totalmarks }
            />
        );

        let btnShown;
        let quizAttemptLink = '/quiz-attempt/' + this.props.courseName + '/' + this.props.classNum
        if ( this.state.hideDoneBtn === false ){
            btnShown = <div className="after-quiz-submit-btns">
                            <div></div>
                            <Button 
                                variant="primary" 
                                href={ quizAttemptLink } 
                                hidden={ this.state.hideDoneBtn }
                            >
                                Quiz Submissions
                            </Button>
                            <Button 
                                variant="secondary" 
                                href="/final-quiz" 
                                hidden={ this.state.hideDoneBtn }
                            >
                                Re-attempt
                            </Button>
                            <div></div>
                        </div>
        }
        else{
            btnShown = <form>
                            <input type="button"
                                className="btn btn-primary" 
                                value="Submit" 
                                onClick={ this.handleSubmitted }
                            />
                        </form>
        }
        
        
        return(
            <div>					
                { questionAnswers }
                
                { btnShown }
                
            </div>
        )
    }
}
export default QuestionPaper;