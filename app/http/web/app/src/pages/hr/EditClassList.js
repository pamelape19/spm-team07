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
            searchValue: ""
        };
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                if (engineer.trainer === false) {
                    this.setState({
                        juniorTrainers: [...this.state.juniorTrainers, {engin_email: engineer.engin_email, engin_name: engineer.engin_name }]
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

    handleChange(e){
        this.setState({
            searchValue: e.target.value
        })
    }
    render(){
        const { courseNameState, startDateTimeState, endDateTimeState, juniorTrainers } = this.state;

        return(
            <div style={{margin: '8% 15%'}}>

                    <h2>
                        { courseNameState }
                    </h2>
                    <div style={{ textAlign: 'left' }}>
                    Class duration: <br/> { startDateTimeState } - { endDateTimeState }
                        <br/>
                    </div>
                    <div className="classlist-layout">
                        <div>
                            <h3>Unassigned Engineers</h3>
                            <div style={{ justifyContent: 'center', marginTop: 20 }}>
                                <form>
                                    <input type="search" id="form1" class="form-control" placeholder="Search" onChange={ this.handleChange } value={ this.state.searchValue }/>
                                    <div style={{ margin: '30px 0px' }}>
                                    { juniorTrainers.filter((trainer)=>{
                                        if (this.state.searchValue == ""){
                                            return trainer
                                        }
                                        else if (trainer.engin_name.toLowerCase().includes(this.state.searchValue.toLowerCase())){
                                            return trainer
                                        }
                                    })
                                    .map((trainer)=><div class="form-check"  style={{ textAlign: 'left' }}>
                                                                        <input class="form-check-input" type="checkbox" value="" id={ trainer.engin_name }/>
                                                                        <label class="form-check-label" for={ trainer.engin_name }>
                                                                            { trainer.engin_name }
                                                                        </label>
                                                                    </div>
                                    ) }
                                    </div>
                                </form>
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
                        
                        <Button variant="primary" style={{ width: 150, margin: 'auto' }}>Assign Engineers</Button>

                    </div>

            </div>
        )
    }
}

export default EditClassList;