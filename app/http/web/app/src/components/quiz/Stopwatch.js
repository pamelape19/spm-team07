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
                <div className="list-group-item stopwatch-row">
                    <div className="stopwatch-col">
                        <div className="minutes">Min</div>
                        <div></div>
                        <div className="seconds">Sec</div>
                    </div>
                    <div className="stopwatch-col">
                        <h4 className="minutes">{ minutes }</h4>
                        <h4>:</h4>
                        <h4 className="seconds">{ seconds }</h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default Stopwatch;