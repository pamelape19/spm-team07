import { Component, React } from "react";
import { Row, Col, Container, Nav } from 'react-bootstrap';
import CourseCard from "../../components/cards/CourseCard";
import AddCourseCard from "../../components/cards/AddCourseCard";

import "./css/homePage.css";

import '../pages.css';

class AdminHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            isLoaded: false,
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5002')
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                courses: result.data.courses
            });
        });
    }
    render(){
        const {courses, isLoaded} = this.state;
        if (!isLoaded){
            return(<div>Loading</div>)
        } else{
            return(
                
                <div style={{ margin: '8% 0' }}>
                    
                    <Container className="learners-container">
                        <Nav variant="tabs" defaultActiveKey="/admin-home" style={{margin: 10}}>
                            <Nav.Item>
                                <Nav.Link href="/admin-home" style={{color: '#000000', fontWeight: 'bold'}}>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/manage-applications" style={{color: '#00000080'}}>Manage Applications</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <h2 style={{padding: '1% 2%'}}>Courses</h2>

                        <center>
                       
                            <Row xs={1} md={4} className="g-4">
                                <AddCourseCard link="/create-course"/>
                                {courses.map((course)=>(
                                    <Col>
                                        <CourseCard link={"/admin-course-page/" + course.course_name} name={course.course_name}/>
                                    </Col>
                                ))}
                            </Row>

                        </center>
                    </Container>

                </div>
            )
        }
    }
}

export default AdminHome;

