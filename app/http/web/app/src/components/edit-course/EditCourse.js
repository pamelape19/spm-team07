import { React, Component } from 'react';
import { Card, Container } from 'react-bootstrap';

import AddChapter from './AddChapter';
import ModalComponent from '../general/ModalComponent';

import './css/editCourse.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';
import Trash from '../../resources/trash.png';

class EditCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            numChapters: 2,
            listChapters: [1],
            courseId: 111,
            courseDesignAdded: false,
            hideTrashCourseDesign: true,
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.showEditCourseDesign = this.showEditCourseDesign.bind(this);
        this.clearCourseDesign = this.clearCourseDesign.bind(this);
    }
    handleAdd = () => {
        this.setState({
            numChapters: this.state.numChapters + 1,
            listChapters: [...this.state.listChapters, this.state.numChapters],
        });
    }
    showEditCourseDesign(){
        this.setState({
            courseDesignAdded: true,
            hideTrashCourseDesign: false,
        })
    }
    clearCourseDesign(){
        this.setState({
            courseDesignAdded: false,
            hideTrashCourseDesign: true,
        })
    }
 
    render(){
        const uploadCourseDesign = <div className="course-design-modal-body">
                                        <input type="file" className="course-design-browse-btn" id={ 'course-design' + this.state.courseId }/><br/>
                                        <b>Note: </b>
                                        All files should be at least 720p and less than 4.0. GB.
                                    </div>
        // conditional rendering for course design's button
        let courseDesignBtn;
        if ( this.state.courseDesignAdded === false ){
            courseDesignBtn = <button className="course-design-btn" onClick={ this.showEditCourseDesign }>
                            <ModalComponent btnName="Upload Content" body={ uploadCourseDesign }/>
                        </button>
        }
        else{
            courseDesignBtn = <button className="course-design-btn" onClick={ this.showEditCourseDesign }>
                            <ModalComponent btnName="Edit Content" body={ uploadCourseDesign }/>
                        </button>
        }
        return(
            <div>
                <Container className="edit-course-header">
                    <div>
                        <h2>
                            HP Printer 1337 Tutorial
                        </h2>
                        <div className="course-start-date">
                            Class duration: DDMMYY - DDMMYY <br/>
                            Trainer: xxxxxxxxxxxxxxx
                        </div>
                    </div>
                    <span className="img-grid">
                        <img src={ EnrolledClassSample } alt="" className="course-img"/>
                    </span>
                </Container>

                <Container className="class-materials">
                    
                    <Card className="card-content-layout">
                        <div className="course-desc"> 
                            Class Design Document
                            <span hidden={ this.state.hideTrashCourseDesign }>
                                <button className="trash-btn" onClick={ this.clearCourseDesign }><img src={ Trash } alt=""/></button>
                            </span>
                        </div>
                        <span>
                            { courseDesignBtn }
                        </span>
                    </Card>

                    {Array.from({ length: this.state.listChapters.length }).map((_, idx) => (
                    
                        <AddChapter chapterItem={ this.state.listChapters[idx] }/>
                        
                    ))}

                    {/* add chapter button */}
                    <button onClick={ this.handleAdd } className="add-chapter-btn">
                        <div style={{fontSize: '1.5em'}}>
                            +
                        </div>
                    </button>
                        
                </Container>
            </div>
        )
    }
}

export default EditCourse;