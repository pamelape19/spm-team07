import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CardListItem from '../../components/cards/CardListItem';

class LearnersEnrolled extends Component{
    constructor(props){
        super(props);
        var today = new Date();
        this.state = {
            enrolledCourseState: [],
            loginEmailState: "samueltan@allinone.com",
            date: today.getDate(),
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            month: today.getMonth(),
            year: today.getFullYear()
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5004/' + this.state.loginEmailState)
        
        .then(res => res.json())
        .then(result => {
            // retrieves all classes the engineer is enrolled in
            let allClassesEnrolled = result.data.enginClasses;
            allClassesEnrolled.map((enrolledCourse)=>{
                // retrieves data of specific course
                fetch('http://127.0.0.1:5002/' + enrolledCourse.Course_name)
                .then(res => res.json())
                .then(result => {
                    let course_desc = result.data.description
                // retrieves data for specific class of course 
                    fetch('http://127.0.0.1:5003/' + enrolledCourse.Course_name + '/' + enrolledCourse.CNo)
                    .then(res => res.json())
                    .then(result => {
                        let classData = result.data
                        if ( this.state.year < Number(classData.End_datetime.split(" ")[3]) ){
                            this.setState({
                                enrolledCourseState: [...this.state.enrolledCourseState, 
                                    {
                                        classNo: enrolledCourse.CNo,
                                        courseName: enrolledCourse.Course_name,
                                        startDateTime: classData.Start_datetime,
                                        endDateTime: classData.End_datetime,
                                        courseDesc: course_desc,
                                        assigned: enrolledCourse.assigned
                                    }]
                            })
                        } else if ( this.state.year === Number(classData.End_datetime.split(" ")[3]) && this.state.month < Number(this.state.months.indexOf(classData.End_datetime.split(" ")[2]))){
                            this.setState({
                                enrolledCourseState: [...this.state.enrolledCourseState, 
                                    {
                                        classNo: enrolledCourse.CNo,
                                        courseName: enrolledCourse.Course_name,
                                        startDateTime: classData.Start_datetime,
                                        endDateTime: classData.End_datetime,
                                        courseDesc: course_desc,
                                        assigned: enrolledCourse.assigned
                                    }]
                            })
                        } else if ( this.state.year === Number(classData.End_datetime.split(" ")[3])
                        && this.state.month === Number(this.state.months.indexOf(classData.End_datetime.split(" ")[2])) 
                        && this.state.date < Number(classData.End_datetime.split(" ")[1])){
                            this.setState({
                                enrolledCourseState: [...this.state.enrolledCourseState, 
                                    {
                                        classNo: enrolledCourse.CNo,
                                        courseName: enrolledCourse.Course_name,
                                        startDateTime: classData.Start_datetime,
                                        endDateTime: classData.End_datetime,
                                        courseDesc: course_desc,
                                        assigned: enrolledCourse.assigned
                                    }]
                            })

                        }
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
                        // sends CNo and CourseName to cardlistitem which will then display according to the DB, CNo will be parsed into back of URL for CourseNum

                        <CardListItem 
                            perc={ 60 } 
                            coursebtn="resume" 
                            assigned = { enrolledCourse['assigned'] } 
                            CourseName = { enrolledCourse['courseName'] } 
                            ClassNum = { enrolledCourse['classNo'] } 
                            startDateTime={ enrolledCourse['startDateTime'] }
                            endDateTime= { enrolledCourse['endDateTime'] }
                            courseDesc = { enrolledCourse['courseDesc'] }
                        />
                    ))}
                </Container>
            </div>
        )
    }
}

export default LearnersEnrolled;