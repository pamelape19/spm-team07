import { React, Component } from 'react';
import { Card, Button } from 'react-bootstrap';

import LectureModal from '../general/LectureModal';

import './css/editCourse.css';
import Trash from '../../resources/trash.png';

class ExistingChapter extends Component{
    constructor(props){
        super(props);
        this.state = {
            lectureAdded: false,
            hideTrashLecture: true,
            hideUploadLectureBtn: false,

        }
        this.showEditLecture = this.showEditLecture.bind(this);
        this.clearLecture = this.clearLecture.bind(this);
    }

    // functions for lecture material's 'upload content' button
    showEditLecture(){
        this.setState({
            lectureAdded: true,
            hideTrashLecture: false,
        })
    }
    clearLecture(){
        this.setState({
            lectureAdded: false,
            hideTrashLecture: true,
        })
    }

    render(){
        const { chapterItem, courseName, classNum, chapterName } = this.props;

        // conditional rendering for lecture's button
        let lectureBtn;
        if ( this.state.lectureAdded === false ){
            lectureBtn = <button className="lecture-btn" onClick={ this.showEditLecture }>
                            <LectureModal btnName="Upload Content" chapterNum={ chapterItem }  courseName={ courseName } classNum={ classNum }/>
                        </button>
        }
        else{
            lectureBtn = <button className="lecture-btn" onClick={ this.showEditLecture }>
                            <LectureModal btnName="Edit Content" chapterNum={ chapterItem }  courseName={ courseName } classNum={ classNum }/>
                        </button>
        }
        
        return(
            <div>
                <Card className="chapter">
                    <div className="card-content-layout">
                        <div className="chapter-num"> 
                            Chapter { chapterItem }  { chapterName } 
                        </div>
                    </div>
                    <div className="card-content-layout">
                        <div className="chapter-materials"> 
                            Lecture materials
                            <span hidden={ this.state.hideTrashLecture }>
                                <button className="trash-btn" onClick={ this.clearLecture }><img src={ Trash } alt=""/></button>
                            </span>
                        </div>
                        <span> 
                            { lectureBtn }
                        </span>
                    </div>
                    <div className="card-content-layout">
                        <div className="chapter-materials"> 
                            Quiz
                        </div>
                        <span> 
                            <Button variant="primary" href="#">Edit Quiz</Button>
                        </span>
                    </div>
                </Card>
            </div>
        )
    }
}

export default ExistingChapter;