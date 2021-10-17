import { Component, React } from "react";
import { Container  } from 'react-bootstrap';
import CompletedCardListItem from "../../components/cards/CompletedCardListItem";

class TrainersHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: true,
            trainCourseState: [],

        }
    }
    componentDidMount(){
        this.setState({
            loginEmailState: "boblee@allinone.com"
        })
        fetch('http://127.0.0.1:5000/train')
        .then(res => res.json())
        .then(result =>{
            let allTrain = result.data.train;
            // console.log(allTrain[0])

            const trainCourse = allTrain.map((trainCourse) => {
                if (trainCourse.trainer_email === this.state.loginEmailState){
                    this.setState({
                        trainCourseState: [...this.state.trainCourseState, [trainCourse.CNo, trainCourse.course_name]],
                    })
                    console.log(trainCourse.course_name)
                }
            });

        })

        fetch('http://127.0.0.1:5000/course')
        .then(res => res.json())
        .then(result => {
            let courses = result.data.courses;
            console.log(courses)
            const course = this.state.trainCourseState.map((course) => {
                console.log(course)
                console.log(this.state.trainCourseState)

                if(course == this.state.trainCourseState[1]){
                    console.log(course.course_name)
                }
            })
        })

        fetch('http://127.0.0.1:5000/classes')
        .then(res => res.json())
        .then(result => {
            let classes = result.data.classes;
            console.log(classes)
            console.log(this.state.trainCourseState)
        })




    }

    render(){
        const {trainCourseState, isLoaded} = this.state;
        console.log(trainCourseState)
        
        return(
            <div style={{ margin: '8% 0' }}>

                <Container>
                    <h1>Assigned Classes to Teach</h1>

                    
                    {trainCourseState.map((trainCourse) => (
                        <CompletedCardListItem  view="trainers" CourseName = {trainCourse[1]}
                        ClassNum = {trainCourse[0]}/>

                    ))}

            
                </Container>
            </div>
        )
    }
}

export default TrainersHome;