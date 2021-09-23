import { React, Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import "./mcqQn.css";

class McqQn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        
        const qn_no = this.props.qn_no;
        const qn = this.props.qn;
        const listOptions = this.props.options.map((option) => option);

        return(
            <div>
                <Container className = "question-block">
                <div className = "question">
                    {qn_no}. {qn}
                </div>
                <div className = "options">
                <Form>
                {this.props.options.map((option) => (
                <Form.Check 
                    type='radio'
                    id = {`default-radio - ${option}`}
                    label =  {option} 
                    name = "group1"
                />
                ))}
                </Form>
                    {/* <ul>{listOptions}
                    </ul> */}

                </div>
                </Container>
            </div>
        )
        
        

    }
}

export default McqQn;