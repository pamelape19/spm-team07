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
        const { chapter, completed, chapterName, classNum , courseName } = this.props;

        // conditional rendering for when # of chapter is less than # of completed chapters
        let checkMark;
        let openLecture;
        let openQuiz;
        let lectureMaterialHref;
        // appending of custom quiz href so that the correct quiz can be displayed - passing chapter number to chapter-quiz route
        
        let openQuizHref;

        if ( chapter < completed ){
            checkMark = <img src={ Check } alt=""/>;
            lectureMaterialHref = 'http://127.0.0.1:5007/download/' + courseName + '/' + classNum + '/' + chapter
            openLecture = <a href={ lectureMaterialHref }><p>Lecture materials</p></a>

            openQuizHref = "/chapter-quiz/" + courseName + "/" + chapterName + "/" + classNum 
            openQuiz = <a href= { openQuizHref } ><p>Quiz</p></a>
        }
        else{
            checkMark = "";
            openLecture = <p>Lecture materials</p>
            // editted out for testing 
            // openQuiz = <p>Quiz</p>

            openQuizHref = "/chapter-quiz/" + courseName + "/" + chapterName + "/" + classNum 
            openQuiz = <a href= { openQuizHref } ><p>Quiz</p></a>
        }

        // conditional rendering to render resume button for the chapter that user left off from
        let resumeBtn;
        let openClasshref;
        openClasshref = "/chapter-class" + chapterName

        if ( chapter === completed ){
            resumeBtn = <a href= { openClasshref } ><Button> Resume </Button></a>
        }
        else{
            resumeBtn = ""
        }

        // conditional rendering for locked chapters (ie. # of chapter is more than # of completed chapters)
        let lockIcon;
        if ( chapter > completed ){
            lockIcon = <img src={ Lock } alt="" style={{ marginTop: '-0.5%' }}/>
        }
        else{
            lockIcon = ""
        }

        return(
            <div>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Chapter { chapter }{" "}{ lockIcon }
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="accordion-content-layout">
                            <p><u>
                                { chapterName }
                            </u></p>
                            <p>{ resumeBtn }</p>
                        </div>
                        
                        <Container className="accordion-content-layout">
                            { openLecture }
                            <p>
                                { checkMark }
                            </p>
                        </Container>
                        <Container className="accordion-content-layout">
                            { openQuiz }
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