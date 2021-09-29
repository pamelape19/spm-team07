import { React, Component } from 'react';
import { Card, Container } from 'react-bootstrap';

import AddChapter from './AddChapter';
import ModalComponent from '../general/ModalComponent';

import './css/editCourse.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class EditCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            numChapters: 2,
            listChapters: [1],
            courseId: 111
        }
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd = () => {

        this.setState({
            
            numChapters: this.state.numChapters + 1,
            listChapters: [...this.state.listChapters, this.state.numChapters],
        });

    }
 
    render(){
        const uploadCourseDesign = <div className="course-design-modal-body">
                                        <input type="file" className="course-design-browse-btn" id={ 'course-design' + this.state.courseId }/><br/>
                                        <b>Note: </b>
                                        All files should be at least 720p and less than 4.0. GB.
                                    </div>
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
                        </div>
                        <span>
                            <ModalComponent btnName="Upload Content" body={ uploadCourseDesign }/>
                        </span>
                    </Card>

                    {Array.from({ length: this.state.listChapters.length }).map((_, idx) => (
                    
                        <AddChapter chapterItem={ this.state.listChapters[idx] }/>
                        
                    ))}

                    {/* add chapter button */}
                    <button onClick={ this.handleAdd } className="add-chapter-btn">
                        <div>
                            +
                        </div>
                    </button>
                        
                </Container>
            </div>
        )
    }
}

export default EditCourse;