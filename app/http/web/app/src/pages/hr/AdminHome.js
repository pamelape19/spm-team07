import { Component, React } from "react";
import { Row, Col, Nav, Container } from 'react-bootstrap';
import TrainersCard from "../../components/cards/TrainersCard";

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import "./css/homePage.css";
import { Card, Button, Nav } from 'react-bootstrap';

import '../pages.css';

class AdminHome extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Printrainer Management</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-home" style={{margin: 10}}>
                    <Nav.Item>
                        <Nav.Link href="/admin-home" style={{color: '#000000', fontWeight: 'bold'}}>Manage Trainers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/manage-learners" style={{color: '#00000080'}}>Manage Learners</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/create-course" style={{color: '#00000080'}}>Manage Courses</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Container>
                <Container style={{paddingTop: '1%'}}>
                    <Row md={4} className="g-4">
                    {Array.from({ length: 1 }).map((_, idx) => (
                        <Col>
                            <TrainersCard link="/individual-trainer"/>
                        </Col>
                    ))}
                    </Row>
                </Container>
                
                <Button variant="primary"> Manage Employees </Button>
                <Button variant="primary"> Manage Trainers </Button>
                <Button variant="primary"> Manage Learners </Button>
                <Button variant="primary"> Manage Courses </Button>
            </div>
        )
    }
}

export default AdminHome;

