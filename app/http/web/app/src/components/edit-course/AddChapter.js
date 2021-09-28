import { React, Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './css/editCourse.css';
import ModalComponent from '../general/ModalComponent';

class AddChapter extends Component{
    constructor(props){
        super(props);
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
                            <ModalComponent btnName="Upload Content" title="upload content modal" body="text in modal"/>
                        </span>
                    </div>
                    <div className="card-content-layout">
                        <div className="chapter-materials"> 
                            Quiz 
                        </div>
                        <span> 
                            <ModalComponent btnName="Upload Content" title="upload content modal" body="text in modal"/>
                        </span>
                    </div>
                </Card>
                
            </div>
        )
    }
}

export default AddChapter;