import { React, Component } from 'react';
import Question from './Question';

class QuestionPaper extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalscore: 0,
            timeElapsed: this.props.timeAllotted,
            showAnswer: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.tick = this.tick.bind(this);
    }
    handleChange = (score) => {
        this.setState({ 
            totalscore: this.state.totalscore + score
        });
      }
    handleSubmitted = (e) => {
        var result = this.state.totalscore;
        this.props.onSubmitted( result );			
        clearInterval( this.interval );
        this.setState({
            showAnswer: true,
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
            <tr>
                <td>
                    <Question 
                        question = { question.qtext }
                        number = { question.no } 
                        options = { question.options } 
                        answer = { question.ans } 
                        marks = { question.marks } 
                        applyNegativeMarking = { this.props.applyNegativeMarking } 
                        onAnswered = { (score)=>this.handleChange(score) }
                        showAnswer = { this.state.showAnswer }
                    />
                </td>
            </tr>
        );
        return(
            <div>					
                <table className="table table-striped">{ questionAnswers }</table>
                <div>
                    <input type="button"
                        className="btn btn-primary" 
                        value="Submit" 
                        onClick={ (e)=>this.handleSubmitted(e) }
                    />
                </div>
            </div>
        )
    }
}
export default QuestionPaper;