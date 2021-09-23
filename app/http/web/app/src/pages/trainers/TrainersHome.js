import { Component, React } from "react";
import { Container } from 'react-bootstrap';
import CompletedCardListItem from "../../components/CompletedCardListItem";

class TrainersHome extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Assigned Classes to Teach</h1>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <CompletedCardListItem view="trainers"/>
                    ))}
                </Container>
            </div>
        )
    }
}

export default TrainersHome;