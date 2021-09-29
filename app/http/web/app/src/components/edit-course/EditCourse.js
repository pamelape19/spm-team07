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

                        <div className="card-text">
                            <div className="course-desc"> 
                                Class Design Document
                            </div>
                        </div>

                        <span>
                            <ModalComponent btnName="Upload Content" title="upload content modal" body="text in modal"/>
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