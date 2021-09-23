import { React, Component } from 'react';
import { Card, Badge, ProgressBar, Button, Container } from 'react-bootstrap';
import './editCourse.css';
import EnrolledClassSample from '../resources/enrolledClassSample.png';

class EditCourse extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                
                <Container>
                    
                    <div class="header"> 
                        <div class="heading">  
                            <h2>
                                HP Printer 1337 Tutorial
                            </h2>
                            <div className="course-start-date">
                                Class duration: DDMMYY - DDMMYY <br/>
                                Trainer: xxxxxxxxxxxxxxx
                            </div>
                        </div>

                        <span>
                            <img src={ EnrolledClassSample } alt="" class="course-img"/>
                        </span>
                    </div>


                    <br/>
                    
                    <Card className="card-content-layout">

 
                        <div class="card-text">
                            <div className="course-desc"> 
                                Class Design Document
                            </div>
                        </div>

                        <div class="filler"></div>

                        <span class="test"> 
                        <Button class="upload-content-btn" variant="primary">Upload Content </Button>
                        </span>

                        <hr/><hr/><hr/>
                        

                        <div class="card-text-repeat">
                            <div className="chapter-num"> 
                                Chapter 1
                            </div>
                        </div>

                        <div class="filler"></div>

                        <span class="test"> 
                        <Button class="upload-content-btn" variant="primary">Upload Content </Button>
                        </span>

                            
                        <div class="card-text-repeat">
                            <div className="chapter-num"> 
                                Lecture materials
                            </div>
                        </div>

                        <div class="filler"></div>

                        <span class="test"> 
                        <Button class="upload-content-btn" variant="primary">Upload Content </Button>
                        </span>



                        <div class="card-text-repeat-last">
                            <div className="chapter-num"> 
                                Quiz 
                            </div>
                        </div>

                        <div class="filler"></div>

                        <span class="test"> 
                        <Button class="upload-content-btn" variant="primary">Upload Content </Button>
                        </span>
                    </Card>     

                </Container>
            </div>
        )
    }
}

export default EditCourse;