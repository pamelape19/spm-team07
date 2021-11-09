import { React, Component } from 'react';
import { Card, Button } from 'react-bootstrap';

import LectureModal from '../general/LectureModal';

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
            hideTrashQuiz: true,
            chapterTitle: "",
            courseNameState: "",
            classNumState: 0,

        }
        this.showEditTitle = this.showEditTitle.bind(this);
        this.editCompleted = this.editCompleted.bind(this);
        this.clearTitle = this.clearTitle.bind(this);
        this.showEditLecture = this.showEditLecture.bind(this);
        this.clearLecture = this.clearLecture.bind(this);
        this.showEditQuiz = this.showEditQuiz.bind(this);
        this.clearQuiz = this.clearQuiz.bind(this);
        this.addChapterTitle = this.addChapterTitle.bind(this);
    }
    // functions for add title button

    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = parseInt(tokenString[5]);
        this.setState({
            classNumState: classNum,
            courseNameState: courseName,
            chapterTitle: "Chapter" + this.props.chapterItem           
        })     

    }
    
    showEditTitle(){
        this.setState({
            hideEditTitle: false,
            hideAddTitleBtn: true
        })
    }
    editCompleted(){
        this.setState({
            // chapterNo: this.props.chapterItem,
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
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = tokenString[5];
        let chapterTitle = this.state.chapterTitle
        
        this.setState({
            quizAdded: true,
            hideTrashQuiz: false,
        })

        window.location = "http://localhost:3000/create-quiz/" + courseName + "/" + classNum + "/" + this.props.chapterItem + "/" + chapterTitle + "/"  ;

    }
    clearQuiz(){
        this.setState({
            quizAdded: false,
            hideTrashQuiz: true,
        })
    }
    addChapterTitle(value){
        this.setState({
            chapterTitle: value
        })
        
    }
    render(){
        const { chapterItem, courseName, classNum }= this.props;

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
                            <LectureModal btnName="Upload Content" chapterNum={ chapterItem }  courseName={ courseName } classNum={ classNum }/>
                        </button>
        }
        else{
            lectureBtn = <button className="lecture-btn" onClick={ this.showEditLecture }>
                            <LectureModal btnName="Edit Content" chapterNum={ chapterItem }  courseName={ courseName } classNum={ classNum }/>
                        </button>
        }
        // conditional rendering for quiz's button
        let quizBtn;
        if ( this.state.quizAdded === false ){
            quizBtn = <Button variant="primary" onClick={ this.showEditQuiz } >Create Quiz</Button>
        }
        else{
            quizBtn = <Button variant="primary" href="#">Edit Quiz</Button>
        }

        let chapterTitleAdded;
        if ( this.state.titleAdded ){
            chapterTitleAdded = this.state.chapterTitle
        }
        
        return(
            <div>
                <Card className="chapter">
                    <div className="card-content-layout">
                        <div className="chapter-num"> 
                            Chapter { chapterItem }  { chapterTitleAdded } 

                            <span style={{ marginLeft: 20 }} hidden={ this.state.hideEditTitle }>
                                <input type="text" onChange={ e => this.addChapterTitle(e.target.value)}  />
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