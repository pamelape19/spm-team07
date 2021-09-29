import {React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import "./css/attempt.css";

class Attempt extends Component{
    constructor(props){
        super(props);
        this.state = {students: this.props.students}
    }
    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key) => {
           return <th key="SCORE">{key.toUpperCase()}</th>
        })
     }
    renderTableData() {
        return this.state.students.map((student, index) => {
           const { no, score, percentage } = student //destructuring
           return (
              <tr key={no}>
                 <td>{no}</td>
                 <td>{score}</td>
                 <td>{percentage}</td>
              </tr>
           )
        })
     }
    render(){
        // const{id, name, score, email} = this.props;
        return(
            <div>
            <h1 id='title'>Quiz Submissions - Introduction to Dynamic printing</h1>
            <table id='scores'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
        )
    }
}

export default Attempt;