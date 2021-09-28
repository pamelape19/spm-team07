import { React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../edit-course/css/editCourse.css';
import EnrolledClassSample from '../../resources/enrolledClassSample.png';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './css/accordionStyle.css';
// import Check from '../../resources/check.png';
// import Lock from '../../resources/lock.png';
import AccordionTop from '../general/AccordionTop';
import AccordionChapters from '../general/AccordionChapters';

class CourseMaterials extends Component{
    constructor(props){
        super(props);
        // this.state = {
        //     expanded: false,
        // }
        // this.handleChange = this.handleChange.bind(this);
    }
    // handleChange = (panel) => (event, newExpanded) => {
    //     if (newExpanded == panel){
    //         this.setState({
    //             expanded: true
    //         })
    //     }
    //     else{
    //         this.setState({
    //             expanded: false
    //         })
    //     }
    // }
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
                {/* <Container>
                <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Course Description
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Exercitation in fugiat est ut ad ea cupidatat ut in
                                cupidatat occaecat ut occaecat consequat est minim minim
                                esse tempor laborum consequat esse adipisicing eu
                                reprehenderit enim.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Class Design Document
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                In ad velit in ex nostrud dolore cupidatat consectetur
                                ea in ut nostrud velit in irure cillum tempor laboris
                                sed adipisicing eu esse duis nulla non.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Chapter 1
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="accordion-content-layout">
                                <p><u>
                                    What is 3d printing
                                </u></p>
                                <p></p>
                            </div>
                            
                            <Container className="accordion-content-layout">
                                <p>
                                    Lecture materials
                                </p>
                                <p>
                                    <img src={Check} alt=""/>
                                </p>
                            </Container>
                            <Container className="accordion-content-layout">
                                <p>
                                    Quiz
                                </p>
                                <p>
                                    <img src={Check} alt=""/>
                                </p>
                            </Container>
                            
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Chapter 2
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="accordion-content-layout">
                                <p><u>
                                    How to use a 3d printer
                                </u></p>
                                <p>
                                    <Button>Resume</Button>
                                </p>
                            </div>
                            
                            <Container className="accordion-content-layout">
                                <p>
                                    Lecture materials
                                </p>
                                <p></p>
                            </Container>
                            <Container className="accordion-content-layout">
                                <p>
                                    Quiz
                                </p>
                                <p></p>
                            </Container>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Chapter 3 {" "}
                                <img src={ Lock } alt="" style={{marginTop: '-0.5%'}}/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="accordion-content-layout">
                                <p><u>
                                    Lorem ipsum
                                </u></p>
                                <p></p>
                            </div>
                            
                            <Container className="accordion-content-layout">
                                <p>
                                    Lecture materials
                                </p>
                                <p></p>
                            </Container>
                            <Container className="accordion-content-layout">
                                <p>
                                    Quiz
                                </p>
                                <p></p>
                            </Container>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
                </Container> */}
            </div>
        )
    }
};
export default CourseMaterials;