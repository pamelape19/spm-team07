import { React, Component } from 'react';
import { Card, Button, Container, Modal } from 'react-bootstrap';

import './editCourse.css';
import EnrolledClassSample from '../resources/enrolledClassSample.png';
import AddChapter from './AddChapter';

class EditCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            numChapters: 2,
            listChapters: [1],
            show: false,
        }
        // console.log(this.state.listChapters);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
    handleShow(){
        console.log(this.state.show)
        this.setState(({
            show: true
        }))
        console.log(this.state.show)
    }
    handleClose(){
        console.log('close')
        this.setState({
            show: false
        })
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
                            <Button variant="primary" onClick={this.handleShow}>
                                Upload Content
                            </Button>
                            <Modal show={this.state.show} onHide={this.handleClose} style={{marginTop: '5%'}}>
                                <Modal.Header>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>  
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