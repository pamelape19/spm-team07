import { Component, React } from "react";
import { Container } from 'react-bootstrap';
import EditCourse from "../../components/edit-course/EditCourse";
import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class TrainersCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseNameState: "",
            classNumState: 0,
            startDateTimeState: null,
            endDateTimeState: null,
            isLoaded: false
        }
    }
    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = parseInt(tokenString[5])

        this.setState({
            classNumState: classNum,
            courseNameState: courseName,
            isLoaded: true
        })
        fetch('http://127.0.0.1:5003')
        .then(res => res.json())
        .then(result => {
            let allClasses = result.data.classes;
            allClasses.map((classOfCourse) => {
                if (classOfCourse.Course_name === this.state.courseNameState && classOfCourse.CNo === this.state.classNumState){
                    this.setState({
                        startDateTimeState: classOfCourse.Start_datetime,
                        endDateTimeState: classOfCourse.End_datetime,
                    })
                }
            })
        })
    }
    render(){
        const { courseNameState, classNumState, startDateTimeState, endDateTimeState, isLoaded } = this.state;
        if ( isLoaded ){
            return(
                
                <div style={{ margin: '8% 0' }}>
                    <Container className="edit-course-header">
                        <div>
                            <h2>
                                { courseNameState }
                            </h2>
                            <div className="course-start-date">
                                Class duration: <br/> { startDateTimeState } - { endDateTimeState } <br/>
                            </div>
                        </div>
                        <span className="img-grid">
                            <img src={ EnrolledClassSample } alt="" className="course-img"/>
                        </span>
                    </Container>
                    <EditCourse courseName={ courseNameState } classNum={ classNumState }/>

                </div>
            )
        }
        else{
            return(
                <div>loading</div>
            )
        }
    }
}

export default TrainersCourse;