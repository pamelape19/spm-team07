import { Component, React } from "react";
import { Container  } from 'react-bootstrap';
import CompletedCardListItem from "../../components/cards/CompletedCardListItem";

class TrainersHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginEmailState: "alexlim@allinone.com",
            trainCourseState: [],

        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5005/' + this.state.loginEmailState )
        .then(res => res.json())
        .then(result => {
            let allTrain = result.data.train;
            console.log(result.data.train)
            allTrain.map((trainCourse) => {
                fetch('http://127.0.0.1:5003/' + this.state.loginEmailState + '/' + trainCourse.course_name + '/' + trainCourse.CNo)
                .then(res => res.json())
                .then(result => {
                    let trainer_class = result.data.trainer_class;
                    this.setState({
                        trainCourseState: [...this.state.trainCourseState, [trainCourse.CNo, trainCourse.course_name, trainer_class.Start_datetime, trainer_class.End_datetime, trainer_class.Capacity ]],
                    })
                })
            });
        })
    }

    render(){
        console.log(this.state.trainCourseState)
        const { trainCourseState } = this.state;
        return(
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Assigned Classes to Teach</h1>
                    
                    {trainCourseState.map((trainCourse) => (
                        <CompletedCardListItem  view="trainers" courseName = { trainCourse[1] }
                        classNum = { trainCourse[0] } startDateTime = { trainCourse[2] } endDateTime = { trainCourse[3] } capacity = { trainCourse[4] } />

                    ))}

                </Container>
            </div>
        )
    }
}

export default TrainersHome;