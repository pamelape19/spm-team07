import { React, Component } from 'react';
import { Container } from 'react-bootstrap';

import { Accordion } from 'react-accessible-accordion';
import AccordionTop from '../general/AccordionTop';
import AccordionChapters from '../general/AccordionChapters';
import AccordionFinalQuiz from '../general/AccordionFinalQuiz';

import './css/courseMaterials.css';
import './css/accordionStyle.css';

import EnrolledClassSample from '../../resources/enrolledClassSample.png';

class CourseMaterials extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const numCompleted = 3;
        const totalChapters = 3;
        return(
            <div style={{ margin: '8% 0' }}>
                 <Container className="course-materials-header">
                    <div>
                        <h2>
                            HP Printer 1337 Tutorial
                        </h2>
                        <div className="course-start-date">
                            Class duration: DDMMYY - DDMMYY <br/>
                            Trainer: xxxxxxxxxxxxxxx
                        </div>
                    </div>
                    <span className="img-grid">
                        <img src={ EnrolledClassSample } alt="" className="course-img"/>
                    </span>
                </Container>
                <Container className="main-body">
                    <Accordion>
                        <AccordionTop/>
                        {Array.from({ length: totalChapters }).map((_, idx) => (
                            <AccordionChapters chapter={ idx + 1 } name="What is 3d printing" completed={ numCompleted }/>
                        ))}
                        <AccordionFinalQuiz completed={ numCompleted } totalChapters={ totalChapters }/>
                    </Accordion>
                </Container>
            </div>
        )
    }
};
export default CourseMaterials;