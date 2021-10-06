import { Component } from "react";
import { Button, Table } from 'react-bootstrap';

import './css/editClassList.css';


class EditClassList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{margin: '8% 15%'}}>

                    <h2>Class XX</h2>
                    <div style={{ textAlign: 'left' }}>
                        DDMMYY 00:00 - DDMMYY 00:00 <br/>
                        XXXXXXXXXXXXXXXXXXXX
                    </div>
                    <div className="classlist-layout">
                        <div>
                            <h3>Unassigned Engineers</h3>
                            <div class="input-group" style={{ justifyContent: 'center', marginTop: 20 }}>
                                <div class="form-outline" style={{width: 340}}>
                                    <input type="search" id="form1" class="form-control" placeholder="Search"/>
                                </div>
                                <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <h3>Engineers in class XX</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Engineer's Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="edit-class-btn-layout">
                        <div></div>
                    
                        <Button variant="secondary">Cancel</Button>
                        <Button variant="primary">Assign Engineers</Button>
                        
                        <div></div>
                    </div>


            </div>
        )
    }
}

export default EditClassList;