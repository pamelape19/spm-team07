import { Component, React } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../pages.css';
import CourseCard from "../../components/CourseCard";
import CourseCarousel from "../../components/CourseCarousel";

class LearnersHome extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{margin: '5% 0'}}>
                <Container>
                    <h1>Courses</h1>
                    <h2>Recommended for you</h2>
                </Container>
                <CourseCarousel/>
                <Container style={{paddingTop: '1%'}}>
                    <h2>3D Printing</h2>
                    <Row md={4} className="g-4">
                    {Array.from({ length: 1 }).map((_, idx) => (
                        <Col>
                            <CourseCard/>
                        </Col>
                    ))}
                    </Row>
                </Container>
                <Container style={{paddingTop: '1%'}}>
                    <h2>HP Printer</h2>
                    <Row md={4} className="g-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Col>
                            <CourseCard/>
                        </Col>
                    ))}
                    </Row>
                </Container>

            </div>
        )
    }
}

export default LearnersHome;