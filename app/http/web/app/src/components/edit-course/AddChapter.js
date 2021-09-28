import { React, Component } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import './css/editCourse.css';

class AddChapter extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        const chapterItem = this.props.chapterItem;
        return(
            <div>
                <Card className="chapter">
                    <div className="card-content-layout">
                        <div className="chapter-num"> 
                            Chapter { chapterItem }
                        </div>
                        <span> 
                            <Button className="upload-content-btn" variant="primary">Add Title</Button>
                        </span>
                    </div>
                    <div className="card-content-layout">
                        <div className="chapter-materials"> 
                            Lecture materials
                        </div>
                        <span> 
                            <Button variant="primary" onClick={this.handleShow}>
                                Launch demo modal
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
                    </div>
                    <div className="card-content-layout">
                        <div className="chapter-materials"> 
                            Quiz 
                        </div>
                        <span> 
                            <Button variant="primary" onClick={this.handleShow}>
                                Launch demo modal
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
                    </div>
                </Card>
                
            </div>
        )
    }
}

export default AddChapter;