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

class AccordionChapters extends Component{
    constructor(props){
        super(props);
        this.state = {
            lectureCompletionCheck: false,
            quizCompletionCheck: false,

        }
        this.updateLecture = this.updateLecture.bind(this);
        this.updateQuiz = this.updateQuiz.bind(this);
    }
    updateLecture(){
        this.setState({
            lectureCompletionCheck: true,
        })
    }
    updateQuiz(){
        this.setState({
            quizCompletionCheck: true,
        })
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
            openLecture = <a href={ lectureMaterialHref } onClick={ this.updateLecture }><p>Lecture materials</p></a>

            openQuizHref = "/chapter-quiz/" + courseName + "/" + chapterName + "/" + classNum 
            openQuiz = <a href= { openQuizHref } onClick={ this.updateQuiz }><p>Quiz</p></a>
        }
        else if ( chapter - 1 === completed ){
            checkMark = "";
            lectureMaterialHref = 'http://127.0.0.1:5007/download/' + courseName + '/' + classNum + '/' + chapter
            openLecture = <a href={ lectureMaterialHref } onClick={ this.updateLecture }><p>Lecture materials</p></a>

            openQuizHref = "/chapter-quiz/" + courseName + "/" + chapterName + "/" + classNum 
            openQuiz = <a href= { openQuizHref } onClick={ this.updateQuiz }><p>Quiz</p></a>
        }
        else{
            checkMark = "";
            openLecture = <p>Lecture materials</p>
            openQuiz = <p>Quiz</p>
        }

        // conditional rendering for locked chapters (ie. # of chapter is more than # of completed chapters)
        let lockIcon;
        if ( chapter > completed + 1 ){
            lockIcon = <img src={ Lock } alt="" style={{ marginTop: '-0.5%' }}/>
        }
        else{
            lockIcon = ""
        }
        if ( this.state.lectureCompletionCheck && this.state.quizCompletionCheck ){
            fetch('http://127.0.0.1:5004/update-num-completed/' + this.props.enginEmail + '/' + this.props.courseName + '/' + this.props.classNum, {
                method: 'PUT'
            })
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