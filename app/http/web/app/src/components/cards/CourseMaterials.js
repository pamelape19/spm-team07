import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import '../edit-course/css/editCourse.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';
import { Accordion } from 'react-accessible-accordion';
import './css/accordionStyle.css';
import AccordionTop from '../general/AccordionTop';
import AccordionChapters from '../general/AccordionChapters';

class CourseMaterials extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{ margin: '8% 0' }}>
                 <Container className="header">
                    <div>
                        <h2>
                            HP Printer 1337 Tutorial
                        </h2>
                        <div className="course-start-date">
                            Class duration: DDMMYY - DDMMYY <br/>
                            Trainer: xxxxxxxxxxxxxxx
                        </div>
                    </div>
                    <span>
                        <img src={ EnrolledClassSample } alt="" className="course-img"/>
                    </span>
                </Container>
                <Container className="main-body">
                    <Accordion>
                        <AccordionTop/>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <AccordionChapters chapter={idx + 1} name="What is 3d printing" completed={2}/>
                        ))}
                    </Accordion>
                </Container>
            </div>
        )
    }
};
export default CourseMaterials;