import { React, Component } from 'react';
import QuestionPaper from './QuestionPaper';
import Stopwatch from './Stopwatch';
import ScoreCard from './ScoreCard';


class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalscore : 0, testSubmitted: false, timeElapsed: this.props.time
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleStopWatch = this.handleStopWatch.bind(this);

    } // end of constructor
    handleChange(result){
        this.setState({totalscore: result.totalscore, testSubmitted: true});
    }
    handleStopWatch(timeElapsed){
        this.setState({timeElapsed: timeElapsed});
    }
    render(){
        var totalmarks = 0;
        this.props.questions.map(question =>{
            totalmarks += question.marks;
        })
        return(
            <div>					
                <h1>{this.props.name}</h1>
                <hr className="divider"/>
                <div>{this.props.description}</div>
                <table className="table">
                    <tr>
                        <td className="col-md-9">
                        <QuestionPaper questions={this.props.questions} applyNegativeMarking={this.props.applyNegativeMarking}
                         onSubmitted={this.handleChange} onTimeChange={this.handleStopwatch} timeAllotted={this.props.time}/>
                         </td>
                         <td className="col-md-3">
                          <Stopwatch timeElapsed={this.state.timeElapsed} />
                          <ScoreCard score={this.state.totalscore} testSubmitted={this.state.testSubmitted} percentage={Math.round(this.state.totalscore*100/totalmarks)}/>					
                        </td>
                    </tr>
                </table>
            </div>
        )
        
    }
}

export default Test