import { React, Component } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./css/manageLearners.css";

class ManageLearners extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{margin: '3% 0'}}>
                 <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-home" style={{margin: 10}}>
                    <Nav.Item>
                        <Nav.Link href="/admin-home" style={{color: '#00000080'}}>Manage Trainers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/manage-learners" style={{color: '#000000', fontWeight: 'bold'}}>Manage Learners</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/create-course" style={{color: '#00000080'}}>Manage Courses</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Container>

                <Container class="contentthing">
                    <div class="form-container">
                        <form className="quiz-form form-course-create">
                            <div className="quiz-row">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label label-course-create">Name</label>
                                        <div class="col-sm-9">
                                        <input type="text" readonly class="form-control" id="courseTitle" placeholder={"Enter Learner's name"}/>
                                        </div>
                                </div>
                                <Button type="submit" variant="secondary"> Search </Button>
                            </div>
                        </form>
                    </div>
                </Container>

                <Container style={{marginTop: '5%'}}>
                    <div class="form-container" >
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Course</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Ong Mark</td>
                            <td>Printing</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry Goh Ah Hai</td>
                            <td>Printing 2</td>
                        </tr>
                        </tbody>
                    </Table>
                    </div>
                </Container>
            </div>
        )
    }
}

export default ManageLearners;
