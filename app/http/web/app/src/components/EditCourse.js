import { React, Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import './editCourse.css';
import EnrolledClassSample from '../resources/enrolledClassSample.png';
import AddChapter from './AddChapter';

class EditCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            numChapters: 2,
            listChapters: [1],
        }
        // console.log(this.state.listChapters);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd = () => {

        this.setState({
            
            numChapters: this.state.numChapters + 1,
            listChapters: [...this.state.listChapters, this.state.numChapters],
        });
        // var newListChapters = this.state.listChapters;
        // newListChapters.push(this.state.numChapters);
        // this.setState({
        //     listChapters: newListChapters
        // });
        console.log(this.state.numChapters)
        console.log(this.state.listChapters)
    }
 
    render(){
        return(
            <div>
                <Container className="header">
                    <div>
                        <h2>
                            HP Printer 1337 Tutorial
                        </h2>
                        <div className="course-start-date">
                            Class duration: DDMMYY - DDMMYY <br/>
                            Trainer: xxxxxxxxxxxxxxx
                        </div>
                    </div>
                    <span>
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
                            <Button className="upload-content-btn" variant="primary">Upload Content</Button>
                        </span>
                    </Card>
                    {/* <AddChapter/> */}
                    {Array.from({ length: this.state.listChapters.length }).map((_, idx) => (
                    
                        <AddChapter chapterItem={this.state.listChapters[idx]}/>
                        
                    ))}

                    {/* add chapter button */}
                    <button onClick={this.handleAdd} className="add-chapter-btn">
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