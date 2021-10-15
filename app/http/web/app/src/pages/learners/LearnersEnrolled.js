import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CardListItem from '../../components/cards/CardListItem';

class LearnersEnrolled extends Component{
    constructor(props){
        super(props);
        this.state = {
            enrolledCourseState: [],
            loginEmailState: "josiahkang@allinone.com"
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5000/enrollment/' + this.state.loginEmailState)
        
        .then(res => res.json())
        .then(result => {
            // retrieves all classes the engineer is enrolled in
            let allClassesEnrolled = result.data.enginClasses;
            const enrolledCourse = allClassesEnrolled.map((enrolledCourse)=>{
                // retrieves data for specific class of course 
                fetch('http://127.0.0.1:5000/classes/' + enrolledCourse.course_name + '/' + enrolledCourse.CNo)
                .then(res => res.json())
                .then(result => {
                    console.log(result.data)
                    let classData = result.data
                    this.setState({
                        enrolledCourseState: [...this.state.enrolledCourseState, 
                            {
                                classNo: enrolledCourse.CNo,
                                courseName: enrolledCourse.course_name,
                                startDate: classData.Start_date,
                                endDate: classData.End_date
                            }]
                    })
                })

            })
        })
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

                    { enrolledCourseState.map((enrolledCourse)=>(
                        // database need another column for assigned
                        // sends CNo and CourseName to cardlistitem which will then display according to the DB, CNo will be parsed into back of URL for CourseNum

                        console.log(enrolledCourse),
                        <CardListItem 
                            perc={ 60 } 
                            coursebtn="resume" 
                            assigned="True" 
                            CourseName = { enrolledCourse['courseName'] } 
                            ClassNum = { enrolledCourse['classNo'] } 
                            startDate={ enrolledCourse['startDate'] }
                            endDate= { enrolledCourse['endDate'] }
                        />
                    ))}
                    {/* <CardListItem perc={ 0 } coursebtn="start" assigned="False"/> */}
                </Container>
            </div>
        )
    }
}

export default LearnersEnrolled;