import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import "./chapterQuiz.css";
import McqQn from '../../components/McqQn';


class ChapterQuiz extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Container className = "header">
                    <h1> Quiz 1 - Introduction to 3D Printing </h1>
                    <p> Estimated Length: 30 mins</p>
                </Container>
                    <hr/>
                <Container className = "questions">
                    <McqQn qn_no = { 1 } qn = "What is 3D Printing?" options = {["lorem ipsum", "ipsum lorem", "lorem ipsum", "ipsum lorem"]} />
                    <McqQn qn_no = { 2 } qn = "3D Printing can print 3D" options = {["True", "False"]}/>
                <div className = "buttons">
                    <div></div>
                <Button type="submit" variant="secondary" >Save</Button>{' '}
                <Button type="submit">Submit</Button>{' '}
                </div>   
                
                </Container>
            </div>
        )
    }
}

export default ChapterQuiz;