import { React, Component } from 'react';
import { Card, Container } from 'react-bootstrap';

import AddChapter from './AddChapter';
import ClassDesignModal from '../general/ClassDesignModal';

import './css/editCourse.css';
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
        const { courseName, classNum } = this.props
        // conditional rendering for course design's button
        let courseDesignBtn;
        if ( this.state.courseDesignAdded === false ){
            courseDesignBtn = <button className="course-design-btn" onClick={ this.showEditCourseDesign }>
                            <ClassDesignModal btnName="Upload Content" courseName={ courseName } classNum={ classNum }/>
                            {/* <ClassDesignModal btnName="Upload Content" uploadId={ this.state.courseId } courseName={ courseName } classNum={ classNum }/> */}
                        </button>
        }
        else{
            courseDesignBtn = <button className="course-design-btn" onClick={ this.showEditCourseDesign }>
                            <ClassDesignModal btnName="Edit Content" courseName={ courseName } classNum={ classNum }/>
                            {/* <ClassDesignModal btnName="Edit Content" uploadId={ this.state.courseId } courseName={ courseName } classNum={ classNum }/> */}
                        </button>
        }
        return(
            <div>

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
                    
                        <AddChapter chapterItem={ this.state.listChapters[idx] }  courseName={ courseName } classNum={ classNum }/>
                        
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