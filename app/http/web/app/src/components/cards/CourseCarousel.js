import { React, Component } from 'react';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import CourseCard from './CourseCard';
import './css/courseCarousel.css';

class CourseCarousel extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { courses } = this.props;
        return(
            <div>
                <Carousel prevLabel="" nextLabel="">
                    <Carousel.Item interval={ 10000 }>
                        <Container className="carousel-container">
                            <center>
                                <Row xs={1} md={4} className="g-4">
                                    {courses.slice(0,4).map((course)=>(
                                        <Col><CourseCard link="/course-page" link={"/course-page/" + course.course_name} name={course.course_name}/></Col>
                                    ))}
                                </Row>
                            </center>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item interval={ 10000 }>
                        <Container className="carousel-container">
                            <center>
                                <Row xs={1} md={4} className="g-4">
                                    {courses.slice(0,4).map((course)=>(
                                        <Col><CourseCard link="/course-page" link={"/course-page/" + course.course_name} name={course.course_name}/></Col>
                                    ))}
                                </Row>
                            </center>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item interval={ 10000 }>
                        <Container className="carousel-container">
                            <center>
                                <Row xs={1} md={4} className="g-4">
                                    {courses.slice(0,4).map((course)=>(
                                        <Col><CourseCard link="/course-page" link={"/course-page/" + course.course_name} name={course.course_name}/></Col>
                                    ))}
                                </Row>
                            </center>
                        </Container>
                    </Carousel.Item>
                    
                </Carousel>
            </div>
        )
    }
}

export default CourseCarousel;