import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CardListItem from '../../components/cards/CardListItem';

class LearnersEnrolled extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-enrolled" style={{ margin: 10 }}>
                    <Nav.Item>
                        <Nav.Link href="/learners-home" style={{ color: '#00000080' }}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-enrolled" style={{ color: '#000000', fontWeight: 'bold' }}>Enrolled</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-completed" style={{ color: '#00000080' }}>Completed</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    <CardListItem perc={ 60 } coursebtn="resume" assigned="True"/>
                    <CardListItem perc={ 95 } coursebtn="resume" assigned="True"/>
                    <CardListItem perc={ 0 } coursebtn="start" assigned="False"/>
                </Container>
            </div>
        )
    }
}

export default LearnersEnrolled;