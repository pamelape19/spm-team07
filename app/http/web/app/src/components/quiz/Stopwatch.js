import { React, Component } from 'react';

class Stopwatch extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { timeElapsed } = this.props;
        return(
            <div className="list-group">
                <div className="list-group-item active">Time Left (In Minutes)</div>
                <div className="list-group-item"><h1>{ timeElapsed }</h1></div>
            </div>
        )
    }
}
export default Stopwatch;