import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CompletedCardListItem from '../../components/CompletedCardListItem';

class LearnersCompleted extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-completed" style={{ margin: 10 }}>
                    <Nav.Item>
                        <Nav.Link href="/learners-home" style={{ color: '#00000080' }}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-enrolled" style={{ color: '#00000080' }}>Enrolled</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-completed" style={{ color: '#000000', fontWeight: 'bold' }}>Completed</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <CompletedCardListItem view="learners"/>
                    ))}
                </Container>
            </div>
        )
    }
}

export default LearnersCompleted;