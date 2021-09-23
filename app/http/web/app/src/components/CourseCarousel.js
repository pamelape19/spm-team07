import { React, Component } from 'react';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import CourseCard from './CourseCard';
import './courseCarousel.css';

class CourseCarousel extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Carousel prevLabel="" nextLabel="">
                    <Carousel.Item interval={10000}>
                        <Container>
                            <Row md={4} className="g-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <Col>
                                    <CourseCard link="/course-page"/>
                                </Col>
                            ))}
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <Container>
                            <Row md={4} className="g-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <Col>
                                    <CourseCard link="/course-page"/>
                                </Col>
                            ))}
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <Container>
                            <Row md={4} className="g-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <Col>
                                    <CourseCard link="/course-page"/>
                                </Col>
                            ))}
                            </Row>
                        </Container>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default CourseCarousel;