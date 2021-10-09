import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CardListItem from '../../components/cards/CardListItem';

class LearnersEnrolled extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: true,
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
                        enrolledCourseState: [...this.state.enrolledCourseState, [enrolledCourse.CNo, enrolledCourse.course_name]]
                    })
                    // console.log(enrolledCourse)
                }

            });
        })
    }
    render(){
        const {enrolledCourseState, isLoaded} = this.state;
        
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

                    {/* enrolledCourseState is an normal index array so you need use index instead of keys to get the values */}
                    {enrolledCourseState.map((enrolledCourse)=>(
                        // database need another column for assigned
                        // sends CNo and CourseName to cardlistitem which will then display according to the DB, CNo will be parsed into back of URL for CourseNum

                        
                        <CardListItem perc={ 60 } coursebtn="resume" assigned="True" CourseName = {enrolledCourse[1]} ClassNum = {enrolledCourse[0]}/>
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