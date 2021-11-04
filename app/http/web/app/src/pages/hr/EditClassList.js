import { Component } from "react";
import { Table } from 'react-bootstrap';

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
            searchValue: "",
            enrolledEngins: [],
            noEnrolledEngins: false,
            checkBoxArray: [],
            enrolledEnginsLoaded: false,
            numEnrolledLoaded: 0

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
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
        
        fetch('http://127.0.0.1:5004/' + courseName + '/' + classNum)
        .then(res => {
            if (!res.ok){
                this.setState({
                    noEnrolledEngins: true
                })
            }
            else{
                res.json()
                .then(result => {
                    let enrolled_array = result.data.enrolled
                    this.setState({
                        numEnrolledLoaded: enrolled_array.length
                    })
                    enrolled_array.map((engin)=>{
                        let count = 0
                        fetch('http://127.0.0.1:5014/' + engin.engin_email)
                        .then(res => res.json())
                        .then(result => {
                            this.setState({
                                enrolledEngins: [...this.state.enrolledEngins, result.data.engin_name]
                            })
                            count += 1
                            if (this.state.numEnrolledLoaded === count){
                                fetch('http://127.0.0.1:5014')
                                .then(res => res.json())
                                .then(result => {
                                    let engineers = result.data.engineers;
                                    engineers.map((engineer) => {
                                        // check that engineer is not a trainer and not already enrolled in this course and class
                                        if (engineer.trainer === false && this.state.enrolledEngins.indexOf(engineer.engin_name) > -1 === false){

                                            this.setState({
                                                juniorTrainers: [...this.state.juniorTrainers, {engin_email: engineer.engin_email, engin_name: engineer.engin_name }],
                                                checkBoxArray: [...this.state.checkBoxArray, {engin_email: engineer.engin_email, engin_name: engineer.engin_name, checked: false }]
                                            });
                                            
                                        }
                                    })
                                })
                            }
                        })
                    })
                })
            }
        })
    }
    onToggle(index, e){
        let newCheckBoxArray = this.state.checkBoxArray.slice();
        newCheckBoxArray[index].checked = !newCheckBoxArray[index].checked
        this.setState({
            checkBoxArray: newCheckBoxArray 
        })
    }

    handleSubmit(){
        this.state.checkBoxArray.map(checkedEngin => {
            if (checkedEngin.checked)
                fetch('http://127.0.0.1:5004/add-enrollment/' + checkedEngin.engin_email + '/' + this.state.courseNameState + '/' + this.state.classNumState, {
                    method: 'POST'
                })
        })
        window.location.reload(false);
    }

    handleChange(e){
        this.setState({
            searchValue: e.target.value
        })
    }
    render(){
        const { courseNameState, classNumState, startDateTimeState, endDateTimeState, juniorTrainers, noEnrolledEngins, enrolledEngins } = this.state;
        let enrolledTable;
        if (noEnrolledEngins){
            enrolledTable = <h5>No learners enrolled.</h5>
        }
        else{
            enrolledTable = <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Engineer's Name</th>
                </tr>
            </thead>
            <tbody>
                    { enrolledEngins.map((enrolledEngin, idx)=>
                        <tr>
                            <td>{ idx + 1 }</td>
                            <td>{ enrolledEngin }</td>
                        </tr>
                    ) }

            </tbody>
        </Table>
        }
        let assignmentSelection;
        if ( juniorTrainers.length === 0 ){
            assignmentSelection = <p style={{ textAlign: 'center' }}>No engineers suitable for this class.</p>
        }
        else{
            assignmentSelection = <form id="assignment" onSubmit={ this.handleSubmit }>
                                        <input type="search" id="form1" class="form-control" placeholder="Search" onChange={ this.handleChange } value={ this.state.searchValue }/>
                                        <div style={{ margin: '30px 0px' }}>
                                            { juniorTrainers.filter((learner)=>{
                                                if (this.state.searchValue === ""){
                                                    return learner
                                                }
                                                else if (learner.engin_name.toLowerCase().includes(this.state.searchValue.toLowerCase())){
                                                    return learner
                                                }
                                            })
                                            .map((learner, i)=><div class="form-check"  style={{ textAlign: 'left' }}>
                                                                                <input class="form-check-input" type="checkbox" onChange={ (e) => this.onToggle(i, e) }/>
                                                                                <label class="form-check-label" for={ learner.engin_name }>
                                                                                    { learner.engin_name }
                                                                                </label>
                                                                            </div>
                                            ) }
                                        </div>
                                        <button class="btn btn-primary" style={{ width: 150, margin: 'auto' }} type="submit" onClick={ this.handleSubmit }>
                                            Assign Engineers
                                        </button>
                                    </form>
        }
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
                                { assignmentSelection }
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <h3>Engineers in class { classNumState }</h3>
                            { enrolledTable }
                        </div>
                    </div>
            </div>
        )
    }
}

export default EditClassList;