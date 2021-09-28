import { React, Component } from 'react';

class ScoreCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { testSubmitted, score, percentage } = this.props;
        var status = "Test not submitted!";
        if( testSubmitted == true ) {
            if( percentage < 50 ) {
                status = "Sorry, you could not pass the test. Try again later!"
            } else {
                status = "Congratulations!! You passed the test.";
            }				
        }

        return(
            <div className="list-group">
                <div className="list-group-item active">Test Result</div>
                <div className="list-group-item">Score: <strong>{ score }</strong></div>
                <div className="list-group-item">Percentage: <strong>{ percentage } &nbsp;%</strong></div>
                <div className="list-group-item">Status: <strong>{ status }</strong></div>
            </div>
        );

    }
}

export default ScoreCard