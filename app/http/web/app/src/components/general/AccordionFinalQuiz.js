import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import '../cards/css/accordionStyle.css';
import Check from '../../resources/check.png';
import Lock from '../../resources/lock.png';

class AccordionFinalQuiz extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { totalChapters, completed } = this.props;

        // conditional rendering to control access to final quiz
        let openQuiz;
        if ( completed >= totalChapters ){
            checkMark = <img src={Check} alt=""/>;
            openQuiz = <a href="/final-quiz"><p>Final Quiz</p></a>
        }
        else{
            openQuiz = <p>Final Quiz</p>
        }

        // conditional rendering for final quiz's lock symbol
        let lockIcon;
        if ( completed < totalChapters ){
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
                            Graded Final Quiz{" "}{ lockIcon }
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <Container className="accordion-content-layout">
                            { openQuiz }
                            <p></p>
                        </Container>
                    </AccordionItemPanel>
                </AccordionItem> 
            </div>
        )
    }
}

export default AccordionFinalQuiz;