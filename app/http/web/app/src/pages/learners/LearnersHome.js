import { Component, React } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import '../pages.css';
import CourseCard from "../../components/cards/CourseCard";
import CourseCarousel from "../../components/cards/CourseCarousel";

class LearnersHome extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{margin: '8% 0'}}>
                <Container>
                    <h1>Courses</h1>
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
                <CourseCarousel/>

                <Container className="learners-container">
                    <h2>3D Printing</h2>
                    <center>
                        <div className="learners-course-cards-layout">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <CourseCard link="/course-page"/>
                        ))}
                        </div>
                    </center>
                </Container>

                <Container className="learners-container">
                    <h2>HP Printer</h2>
                    <center>
                        <div className="learners-course-cards-layout">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <CourseCard link="/course-page"/>
                        ))}
                        </div>
                    </center>
                </Container>

            </div>
        )
    }
}

export default LearnersHome;