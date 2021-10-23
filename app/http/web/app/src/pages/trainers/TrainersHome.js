import { Component, React } from "react";
import { Container  } from 'react-bootstrap';
import CompletedCardListItem from "../../components/cards/CompletedCardListItem";

class TrainersHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginEmailState: "boblee@allinone.com",
            trainCourseState: [],

        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5005')
        .then(res => res.json())
        .then(result =>{
            let allTrain = result.data.train;
            allTrain.map((trainCourse) => {
                if (trainCourse.trainer_email === this.state.loginEmailState){
                    this.setState({
                        trainCourseState: [...this.state.trainCourseState, [trainCourse.CNo, trainCourse.course_name]],
                    })
                }
            });

        })
    }

    render(){
        const { trainCourseState } = this.state;
        return(
            <div style={{ margin: '8% 0' }}>

                <Container>
                    <h1>Assigned Classes to Teach</h1>

                    
                    {trainCourseState.map((trainCourse) => (
                        <CompletedCardListItem  view="trainers" courseName = {trainCourse[1]}
                        classNum = {trainCourse[0]}/>

                    ))}

            
                </Container>
            </div>
        )
    }
}

export default TrainersHome;