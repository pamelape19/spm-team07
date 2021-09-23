import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChapterQuiz from './learners/ChapterQuiz';

class Home extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div style={{margin: '8% 0'}}>
                "starting page!"
                <ChapterQuiz/>
            </div>
        );
    }
}

export default Home;