import { React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';

import "./css/createCourse.css";

class CreateCourse extends Component{
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


                        <div className="headerspace name"> 


                            <span className="headertext"> Name: </span>  Mr dubibird 
                            <input type="text" readonly class="form-control-plaintext" id="quizTitle" value={" "+"Chapter 1 - What is 3D Printing?"}/>
                        </div>


                            <Button variant="secondary">Assign Learner </Button>
                        </div>
                     
                </Container>
            </div>
        )
    }
}

export default CreateCourse;