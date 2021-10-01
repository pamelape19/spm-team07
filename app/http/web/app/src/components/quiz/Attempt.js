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
      //   let header_1 = <th>ATTEMPT NO</th>
      //   let header_2 = <th> SCORE</th>
      //   let headers = header_1 + header_2
      //   return headers
        return header.map((value,index) => {
           return <th key = {index}>{value.toUpperCase()}</th>
        })
     }
    renderTableData() {
        return this.state.students.map((student, index) => {
           const { no, score, result } = student //destructuring
         //   console.log(passed)
           if (result){
              var outcome = "pass"
              var text = "Pass"
           }
           else{
            var outcome = "fail"
            var text = "Fail"

           }
           return (
              <tr key={no} >
                 <td >{no}</td>
                 <td  id = {outcome}>{score}</td>
                 <td id = {outcome}>{text}</td>
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