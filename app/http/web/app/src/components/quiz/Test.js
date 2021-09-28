import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import QuestionPaper from './QuestionPaper';
import Stopwatch from './Stopwatch';
import ScoreCard from './ScoreCard';


class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalscore : 0, 
            testSubmitted: false, 
            timeElapsed: this.props.time
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleStopWatch = this.handleStopWatch.bind(this);
    };
    handleChange = (result) => {
        this.setState({
            totalscore: result,
            testSubmitted: true
        });
    };
    handleStopWatch = (timeElapsed) => {
        this.setState({timeElapsed: timeElapsed});
    };
    render(){
        var totalmarks = 0;
        const { name, time, questions, applyNegativeMarking } = this.props;

        const marksArray = this.props.questions.map( (question) => question.marks );
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        totalmarks = marksArray.reduce(reducer);
        return(
            <div>
                <Container className="header">					
                    <h1>{ name }</h1>
                    <div>Estimated Length: { time } mins</div>
                </Container>
                <hr/>
                <table className="table">
                    <tr>
                        <td className="col-md-2"></td>
                        <td className="col-md-5">
                            <QuestionPaper 
                                questions={ questions }
                                applyNegativeMarking={ applyNegativeMarking }
                                onSubmitted={ (result) => this.handleChange(result) } 
                                onTimeChange={ (timeElapsed) => this.handleStopWatch(timeElapsed) } 
                                timeAllotted={ time }
                            />
                         </td>
                         <td className="col-md-3">
                          <Stopwatch timeElapsed={ this.state.timeElapsed } />
                          <ScoreCard score={ this.state.totalscore } testSubmitted={ this.state.testSubmitted } percentage={ Math.round(this.state.totalscore*100/totalmarks) }/>					
                        </td>
                        <td className="col-md-3"></td>
                    </tr>
                </table>
            </div>
        )
        
    }
}

export default Test;