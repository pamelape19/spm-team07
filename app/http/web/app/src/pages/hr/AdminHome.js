import { Component, React } from "react";
import { Row, Col, Nav, Container } from 'react-bootstrap';
import TrainersCard from "../../components/cards/TrainersCard";
import CourseCard from "../../components/cards/CourseCard";
import AddCourseCard from "../../components/cards/AddCourseCard";

// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import "./css/homePage.css";
import { Card, Button } from 'react-bootstrap';

import '../pages.css';

class AdminHome extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Courses</h1>
                </Container>
                
                <Container className="learners-container">
                    <h2>HP Printer</h2>
                    <center>
                        <div className="learners-course-cards-layout">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <CourseCard link="/course-page"/>
                        ))}
                        <AddCourseCard link="/create-course" courseName="HP Printer"/>
                        </div>
                    </center>
                </Container>

                <Container className="learners-container">
                    <h2>3D Printing</h2>
                    <center>
                        <div className="learners-course-cards-layout">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <CourseCard link="/course-page"/>
                        ))}
                        <AddCourseCard link="/create-course"/>
                        </div>
                    </center>
                </Container>

                <Container className="learners-container">
                    <h2>Printer Maintenance</h2>
                    <center>
                        <div className="learners-course-cards-layout">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <CourseCard link="/course-page"/>
                        ))}
                        <AddCourseCard link="/create-course"/>
                        </div>
                    </center>
                </Container>
                
            </div>
        )
    }
}

export default AdminHome;

