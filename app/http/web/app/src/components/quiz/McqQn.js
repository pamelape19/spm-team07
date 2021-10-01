import { React, Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import "./css/mcqQn.css";

class McqQn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { qn_no, qn, options } = this.props;

        return(
            <div>
                <Container className = "mcq-question-block">
                    <div className = "mcq-question">
                        { qn_no }. { qn }
                    </div>
                    <div className = "options">
                        <Form>
                            {options.map((option) => (
                                <Form.Check className = "mcq-form-check"
                                    type='radio'
                                    id = {`default-radio - ${ option }`}
                                    label =  { option } 
                                    name = "group1"
                                />
                            ))}
                        </Form>
                    </div>
                </Container>
            </div>
        )
    }
}

export default McqQn;