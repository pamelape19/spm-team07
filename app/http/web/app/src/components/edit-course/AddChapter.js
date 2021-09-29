import { React, Component } from 'react';
import { Card, Button } from 'react-bootstrap';

import ModalComponent from '../general/ModalComponent';

import './css/editCourse.css';
import Done from '../../resources/check.png';
import Trash from '../../resources/trash.png';

class AddChapter extends Component{
    constructor(props){
        super(props);
        this.state = {
            titleAdded: false,
            hideEditTitle: true,
            hideAddTitleBtn: false,
            lectureAdded: false,
            hideTrashLecture: true,
            hideUploadLectureBtn: false,
            quizAdded: false,
            hideTrashQuiz: true
        }
        this.showEditTitle = this.showEditTitle.bind(this);
        this.editCompleted = this.editCompleted.bind(this);
        this.clearTitle = this.clearTitle.bind(this);
        this.showEditLecture = this.showEditLecture.bind(this);
        this.clearLecture = this.clearLecture.bind(this);
        this.showEditQuiz = this.showEditQuiz.bind(this);
        this.clearQuiz = this.clearQuiz.bind(this);
    }
    // functions for add title button
    showEditTitle(){
        this.setState({
            hideEditTitle: false,
            hideAddTitleBtn: true
        })
    }
    editCompleted(){
        this.setState({
            titleAdded: true,
            hideEditTitle: true,
            hideAddTitleBtn: false,
        })
    }
    clearTitle(){
        this.setState({
            titleAdded: false,
            hideEditTitle: true,
            hideAddTitleBtn: false,
        })
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
    // functions for quiz's 'upload content' button
    showEditQuiz(){
        this.setState({
            quizAdded: true,
            hideTrashQuiz: false,
        })
        window.location = "http://localhost:3000/create-quiz";
    }
    clearQuiz(){
        this.setState({
            quizAdded: false,
            hideTrashQuiz: true,
        })
    }
    render(){
        const chapterItem = this.props.chapterItem;
        const uploadLecture = <div className="lecture-modal-body">
                                <input type="file" className="lecture-browse-btn" id={ 'lecture' + chapterItem}/><br/>
                                <b>Note: </b>
                                All files should be at least 720p and less than 4.0. GB.
                            </div>
        // conditional rendering for title's button
        let titleBtn;
        if ( this.state.titleAdded === false ){
            titleBtn = <Button variant="primary" onClick={ this.showEditTitle } hidden={ this.state.hideAddTitleBtn }>Add Title</Button>
        }
        else{
            titleBtn = <Button variant="primary" onClick={ this.showEditTitle } hidden={ this.state.hideAddTitleBtn }>Edit Title</Button>
        }
        // conditional rendering for lecture's button
        let lectureBtn;
        if ( this.state.lectureAdded === false ){
            lectureBtn = <button className="lecture-btn" onClick={ this.showEditLecture }>
                            <ModalComponent btnName="Upload Content" body={ uploadLecture }/>
                        </button>
        }
        else{
            lectureBtn = <button className="lecture-btn" onClick={ this.showEditLecture }>
                            <ModalComponent btnName="Edit Content" body={ uploadLecture }/>
                        </button>
        }
        // conditional rendering for quiz's button
        let quizBtn;
        if ( this.state.quizAdded === false ){
            quizBtn = <Button variant="primary" onClick={ this.showEditQuiz }>Create Quiz</Button>
        }
        else{
            quizBtn = <Button variant="primary" onClick={ this.showEditQuiz } href="#">Edit Quiz</Button>
        }
        
        return(
            <div>
                <Card className="chapter">
                    <div className="card-content-layout">
                        <div className="chapter-num"> 
                            Chapter { chapterItem }
                            <span style={{ marginLeft: 20 }} hidden={ this.state.hideEditTitle }>
                                <input type="text"/>
                                <button className="done-btn" onClick={ this.editCompleted }><img src={ Done } alt=""/></button>
                                <button className="trash-btn" onClick={ this.clearTitle }><img src={ Trash } alt=""/></button>
                            </span>
                        </div>
                        <span> 
                            { titleBtn }
                        </span>
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
                            <span hidden={ this.state.hideTrashQuiz }>
                                <button className="trash-btn" onClick={ this.clearQuiz }><img src={ Trash } alt=""/></button>
                            </span>
                        </div>
                        <span> 
                            { quizBtn }
                        </span>
                    </div>
                </Card>
            </div>
        )
    }
}

export default AddChapter;