import { React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import '../cards/css/accordionStyle.css';
import Check from '../../resources/check.png';
import Lock from '../../resources/lock.png';

class AccordionChapters extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let checkMark;
        if (this.props.chapter < this.props.completed){
            checkMark = <img src={Check} alt=""/>
        }
        else{
            checkMark = ""
        }

        let resumeBtn;
        if (this.props.chapter === this.props.completed){
            resumeBtn = <Button>Resume</Button>
        }
        else{
            resumeBtn = ""
        }

        let lockIcon;
        if (this.props.chapter > this.props.completed){
            lockIcon = <img src={ Lock } alt="" style={{marginTop: '-0.5%'}}/>
        }
        else{
            lockIcon = ""
        }

        return(
            <div>
                
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Chapter {this.props.chapter}{" "}{ lockIcon }
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="accordion-content-layout">
                            <p><u>
                                {this.props.name}
                            </u></p>
                            <p>{ resumeBtn }</p>
                        </div>
                        
                        <Container className="accordion-content-layout">
                            <p>
                                Lecture materials
                            </p>
                            <p>
                                { checkMark }
                            </p>
                        </Container>
                        <Container className="accordion-content-layout">
                            <p>
                                Quiz
                            </p>
                            <p>
                                { checkMark }
                            </p>
                        </Container>
                        
                    </AccordionItemPanel>
                </AccordionItem>
                
            </div>
        )
    }
}

export default AccordionChapters;