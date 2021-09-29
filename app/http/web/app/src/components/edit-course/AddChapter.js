import { React, Component } from 'react';
import { Card, Button } from 'react-bootstrap';

import ModalComponent from '../general/ModalComponent';

import './css/editCourse.css';

// import Edit from '../../resources/edit.png';
import Done from '../../resources/check.png';
import Trash from '../../resources/trash.png';

class AddChapter extends Component{
    constructor(props){
        super(props);
        this.state = {
            titleAdded: false,
            hideEditTitle: true,
            hideAddTitleBtn: false
        }
        this.showEditTitle = this.showEditTitle.bind(this);
        this.editCompleted = this.editCompleted.bind(this);
        this.clearTitle = this.clearTitle.bind(this);
    }
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
    render(){
        const chapterItem = this.props.chapterItem;
        let titleBtn;
        if ( this.state.titleAdded === false ){
            titleBtn = <Button variant="primary" onClick={ this.showEditTitle } hidden={ this.state.hideAddTitleBtn }>Add Title</Button>
        }
        else{
            titleBtn = <Button variant="primary" onClick={ this.showEditTitle } hidden={ this.state.hideAddTitleBtn }>Edit Title</Button>
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