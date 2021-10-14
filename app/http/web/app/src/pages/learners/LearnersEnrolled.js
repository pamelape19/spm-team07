import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CardListItem from '../../components/cards/CardListItem';

class LearnersEnrolled extends Component{
    constructor(props){
        super(props);
        this.state = {
            enrolledCourseState: []
        }
    }
    componentDidMount(){
        this.setState({
            loginEmailState: "josiahkang@allinone.com"
        })
        fetch('http://127.0.0.1:5000/enrollment')
        .then(res => res.json())
        .then(result => {
            let allEnrollment = result.data.enrollment;

            const enrolledCourse = allEnrollment.map((enrolledCourse) => {
                if (enrolledCourse.engin_email === this.state.loginEmailState){
                    this.setState({
                        enrolledCourseState: [...this.state.enrolledCourseState, {classNo: enrolledCourse.CNo, courseName: enrolledCourse.course_name}]
                    })
                    // console.log(enrolledCourse)
                }

            });
        })

        // fetch('http://127.0.0.1:5000/classes')
    }

    render(){
        const { enrolledCourseState } = this.state;
        
        return(
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-enrolled" style={{ margin: 10 }}>
                    <Nav.Item>
                        <Nav.Link href="/learners-home" style={{ color: '#00000080' }}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-enrolled" style={{ color: '#000000', fontWeight: 'bold' }}>Enrolled</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-completed" style={{ color: '#00000080' }}>Completed</Nav.Link>
                    </Nav.Item>
                    </Nav>

                    {enrolledCourseState.map((enrolledCourse)=>(
                        // database need another column for assigned
                        // sends CNo and CourseName to cardlistitem which will then display according to the DB, CNo will be parsed into back of URL for CourseNum

                        
                        <CardListItem perc={ 60 } coursebtn="resume" assigned="True" CourseName = {enrolledCourse['courseName']} ClassNum = {enrolledCourse['classNo']}/>
                    ))}
                    {/* <CardListItem perc={ 60 } coursebtn="resume" assigned="True"/>
                    <CardListItem perc={ 95 } coursebtn="resume" assigned="True"/>
                    <CardListItem perc={ 0 } coursebtn="start" assigned="False"/> */}
                </Container>
            </div>
        )
    }
}

export default LearnersEnrolled;