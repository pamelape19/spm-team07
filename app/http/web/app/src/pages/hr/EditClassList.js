import { Component } from "react";
import { Button, Table } from 'react-bootstrap';

import './css/editClassList.css';


class EditClassList extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseNameState: "",
            classNumState: 0,
            startDateTimeState: null,
            endDateTimeState: null,
            juniorTrainers: [],
        };
        this.handleSubmitted = this.handleSubmitted.bind(this);
    }

    componentDidMount(){
        let tokenString = window.location.href.split('/');
        let tokenWords = tokenString[4].split('%20');
        let courseName = tokenWords.join(" ");
        let classNum = parseInt(tokenString[5])

        this.setState({
            courseNameState: courseName,
            classNumState: classNum,
        })

        fetch('http://127.0.0.1:5003')
        .then(res => res.json())
        .then(result => {
            let allClasses = result.data.classes;
            allClasses.map((classOfCourse) => {
                if (classOfCourse.Course_name === this.state.courseNameState && classOfCourse.CNo === this.state.classNumState){
                    this.setState({
                        startDateTimeState: classOfCourse.Start_datetime,
                        endDateTimeState: classOfCourse.End_datetime,
                    })
                }

            })
        })

        fetch('http://127.0.0.1:5014')
        .then(res => res.json())
        .then(result => {
            let engineers = result.data.engineers;
            engineers.map((engineer) => {
                if (engineer.trainer == "0") {
                    this.setState({
                        isLoaded: true,
                        juniorTrainers: [...this.state.juniorTrainers, engineer.engin_email]
                    });
                }
            })
        })
    }

    handleSubmitted(){
        const assignForm = document.getElementById('assignForm');
        console.log(assignForm);
        const formData = new FormData(assignForm);
        console.log(formData);
        fetch('http://127.0.0.1:5003/' + this.state.courseNameState + '/' + this.state.classNumState,{
            method: "POST",
            body: formData          
        })
    }

    render(){
        const { courseNameState, startDateTimeState, endDateTimeState, juniorTrainers } = this.state;
        const trainers = juniorTrainers.map((trainer) => <option value={trainer}>{trainer}</option>)
        return(
            <div style={{margin: '8% 15%'}}>

                    <h2>
                        {courseNameState}
                    </h2>
                    <div style={{ textAlign: 'left' }}>
                    Class duration: <br/> { startDateTimeState } - { endDateTimeState }
                        <br/>
                    </div>
                    <div className="classlist-layout">
                        <div>
                            <h3>Unassigned Engineers</h3>
                            <div class="input-group" style={{ justifyContent: 'center', marginTop: 20 }}>
                                <div class="form-outline" style={{width: 340}}>
                                        <form id="assignForm" className="assign-form">
                                            <div class="form-group row">
                                                <div class="col-sm-7">
                                                    <select class="form-select" name = "trainer" >
                                                        { trainers }
                                                    </select>
                                                </div>
                                            </div>


                                            <Button variant="primary" type="submit" onClick={ this.handleSubmitted }>Assign Engineers</Button>
                                        </form>
                                        {/* <input type="search" id="form1" class="form-control" placeholder="Search"/> */}
                                </div>
                                {/* <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button> */}
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
                        {/* <Button variant="primary">Assign Engineers</Button> */}
                        
                        <div></div>
                    </div>


            </div>
        )
    }
}

export default EditClassList;