import { React, Component } from 'react';

import './css/test.css';

class Stopwatch extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const minutes = Math.floor( this.props.timeElapsed )
        const seconds = Math.round(( this.props.timeElapsed - minutes )*60, 2)
        return(
            <div className="list-group">
                <div className="list-group-item active">Time Left (In Minutes)</div>
                <div className="list-group-item test-stopwatch-row">
                    <div className="test-stopwatch-col">
                        <div className="test-minutes">Min</div>
                        <div></div>
                        <div className="test-seconds">Sec</div>
                    </div>
                    <div className="test-stopwatch-col">
                        <h4 className="test-minutes">{ minutes }</h4>
                        <h4>:</h4>
                        <h4 className="test-seconds">{ seconds }</h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default Stopwatch;