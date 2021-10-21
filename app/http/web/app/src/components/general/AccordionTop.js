import { React, Component } from 'react';
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import '../cards/css/accordionStyle.css';

class AccordionTop extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { courseName, classNum } = this.props;
        let classDesignHref = 'http://127.0.0.1:5000/download/' + courseName + '/' + classNum
        return(
            <div>
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
                    <AccordionItemPanel style={{textAlign: 'left', marginLeft: 20}}>
                        <a href={ classDesignHref }>Download Class Design Document</a>
                    </AccordionItemPanel>
                </AccordionItem>
            </div>
        )
    }
}

export default AccordionTop;