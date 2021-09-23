import { Component, React } from "react";
import { Container, Col, Nav  } from 'react-bootstrap';
import EditCourse from "../../components/EditCourse";

class TrainersCourse extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            
            <div style={{ margin: '8% 0' }}>
                <EditCourse/>
                <div> aaaaaaaa </div>
            </div>
        )
    }
}

export default TrainersCourse;