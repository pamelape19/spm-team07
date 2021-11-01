import { Component, React } from "react";
import { Container, Nav, Table, Button } from "react-bootstrap";

import "./css/manageApplications.css";

class ManageApplications extends Component{
    constructor(props){
        super(props)
        this.state = {
            pendingApplications: [],
            noApplications: false,
        }
        this.acceptApplication = this.acceptApplication.bind(this);
        this.rejectApplication = this.rejectApplication.bind(this);
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5004/manage-applications')
        .then(res => {
            // show 'no pending applications' if 404 returned
            if (!res.ok){
                this.setState({
                    noApplications: true
                })
            }
            else{
                res.json()
                .then(result => {
                    let pending = result.data.pending
                    pending.map((application) => (
                        this.setState({
                            pendingApplications: [...this.state.pendingApplications, {
                                engin_email: application.engin_email,
                                Course_name: application.Course_name,
                                CNo: application.CNo
                            }]
                        })
        
                    ))
                })
            }
        })
    }
    acceptApplication(engin_email, Course_name, CNo){
        let updateHref = "update-enrollment/" + engin_email + "/" + Course_name + "/"+ CNo
        fetch('http://127.0.0.1:5004/' + updateHref, {
            method: "PUT"
        })
        let updateCapacity = "update-capacity/" + Course_name + "/" + CNo
        fetch('http://127.0.0.1:5003/' + updateCapacity, {
            method: "PUT"
        })
        window.location.reload(false);
    }
    rejectApplication(engin_email, Course_name, CNo){
        let deleteHref = "delete-enrollment/" + engin_email + "/" + Course_name + "/"+ CNo
        fetch('http://127.0.0.1:5004/' + deleteHref, {
            method: "DELETE"
        })
        window.location.reload(false);
    }
    render(){
        const { pendingApplications, noApplications } = this.state;
        let display;
        if ( noApplications === false ){
            display = <div>
                 <h2 style={{padding: '1% 2%'}}>Applications</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Engineer Email</th>
                                <th>Course Name</th>
                                <th>Class No.</th>
                                <th>Enrolment</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                pendingApplications.map((pendingApplication, idx)=>
                                    <tr>
                                        <td>{ idx + 1 }</td>
                                        <td>{ pendingApplication.engin_email }</td>
                                        <td>{ pendingApplication.Course_name }</td>
                                        <td>{ pendingApplication.CNo }</td>
                                        <td className="manage-btns">
                                            <div></div>
                                            <Button variant="primary" as="input" type="button" value="Accept" onClick={ ()=>this.acceptApplication(pendingApplication.engin_email, pendingApplication.Course_name, pendingApplication.CNo) } />
                                            <Button variant="secondary" as="input" type="button" value="Reject" onClick={ ()=>this.rejectApplication(pendingApplication.engin_email, pendingApplication.Course_name, pendingApplication.CNo) } />
                                            <div></div>
                                        </td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </Table>
            </div>
        }
        else{
            display = <h5>No pending applications.</h5>
        }
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
                    { display }
                </Container>
            </div>
        )
    }
}

export default ManageApplications;