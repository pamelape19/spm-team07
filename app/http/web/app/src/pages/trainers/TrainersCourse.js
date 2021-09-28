import { Component, React } from "react";
import EditCourse from "../../components/edit-course/EditCourse";

class TrainersCourse extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            
            <div style={{ margin: '8% 0' }}>
                <EditCourse/>
                <div>  </div>
            </div>
        )
    }
}

export default TrainersCourse;