import { Component, React } from "react";
import { Container, Nav, Table, Button } from "react-bootstrap";

import "./css/manageApplications.css";

class ManageApplications extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{ margin: '8% 0' }}>
                <Container className="learners-container">
                    <Nav variant="tabs" defaultActiveKey="/manage-applications" style={{margin: 10}}>
                        <Nav.Item>
                            <Nav.Link href="/admin-home" style={{color: '#00000080'}}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/manage-applications" style={{color: '#000000', fontWeight: 'bold'}}>Manage Applications</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <h2 style={{padding: '1% 2%'}}>Applications</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Engineer Email</th>
                            <th>Enrolment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td className="manage-btns">
                                <div></div>
                                <Button variant="primary" as="input" type="button" value="Accept" />
                                <Button variant="secondary" as="input" type="button" value="Reject" />
                                <div></div>
                            </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default ManageApplications;