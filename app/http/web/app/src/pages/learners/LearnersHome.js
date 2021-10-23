import { Component, React } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import '../pages.css';
import CourseCard from "../../components/cards/CourseCard";
import CourseCarousel from "../../components/cards/CourseCarousel";

class LearnersHome extends Component{
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
            <div style={{margin: '8% 0'}}>

                <Container>
                    <Nav variant="tabs" defaultActiveKey="/learners-home" style={{margin: 10}}>
                    <Nav.Item>
                        <Nav.Link href="/learners-home" style={{color: '#000000', fontWeight: 'bold'}}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-enrolled" style={{color: '#00000080'}}>Enrolled</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-completed" style={{color: '#00000080'}}>Completed</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    <h2>Recommended for you</h2>
                </Container>
                <CourseCarousel courses={courses}/>

                <Container className="learners-container">
                    <h2>Courses</h2>
                    <center>
                       
                        <Row xs={1} md={4} className="g-4">
                            {courses.map((course)=>(
                                <Col>
                                    <CourseCard link={"/course-page/" + course.course_name} name={course.course_name}/>
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

export default LearnersHome;