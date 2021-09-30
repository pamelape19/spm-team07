import { React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import dubibird from '../../resources/dubibird.png';
import "./css/individualtrainer.css";


class IndividualTrainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            completedCourse: ["a","b"],
            currentlyLearning:[]
        }
 
    }
    render(){
        return(
            <div style={{margin: '3% 0'}}>
                {/* <img src={banner} alt="" style={{width: '100%'}}/> */}
                <Container style={{marginTop: '5%'}}>
                    
                    <div className="content"> 
                        <img src={dubibird} alt="" className="imageclass"  />

                        <div className="headerspace name"> 

                            <h3 class="learner">  Learner </h3>  
                            <br></br>
                            <span className="headertext"> Name: </span>  Mr dubibird 
 
                        </div>

                        <div className="headerspace"> 
                            <span className="headertext"> Title: </span> Senior engineer 
                        </div>

                        <div className="headerspace">                     
                            <span className="headertext"> Currently learning: </span> 
                            <br></br>                          
                            Introduction to 3D printing
                            <br></br>
                            Printer 3110 Introduction
                             
                            {this.state.completedCourse.map((item, idx) => (
                                <br></br>

                            ))}
                        </div>

                        <div className="headerspace"> 
                            <span className="headertext"> Courses completed:  </span> 
                            <br></br>
                            Printer 9110 Servicing
                            <br></br>
                            Printer 9110 Introduction

                        </div>


                    </div>
                        <div class="assign"> 
                            <Button variant="primary">Assign Learner </Button>
                        </div>
                     
                </Container>
            </div>
        )
    }
}

export default IndividualTrainer;