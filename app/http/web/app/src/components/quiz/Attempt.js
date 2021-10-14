import {React, Component } from 'react';
import "./css/attempt.css";

class Attempt extends Component{
    constructor(props){
        super(props);
    }
    
    renderTableData() {
        return this.props.learnerResults.map((learnerResult, index) => {
           const { no, score, result } = learnerResult //destructuring
           if (result){
               var outcome = "pass"
               var text = "Pass"
           }
           else{
               var outcome = "fail"
               var text = "Fail"
           }
           return (
              <tr key={ no } >
                 <td id={ outcome }>{ no }</td>
                 <td  id={ outcome }>{ score }</td>
                 <td id={ outcome }>{ text }</td>
              </tr>
           )
        })
     }
    render(){
        return(
            <div>
            <h1 id='title'>Quiz Submissions - Introduction to Dynamic printing</h1>
            <table id='scores' style={{ width: '100%', marginTop: 20 }}>
               <thead>
                  <tr>
                     <th style={{ width: '15%' }}>Attempt No.</th>
                     <th>Score</th>
                     <th>Result</th>
                  </tr>
               </thead>
               <tbody>
                  { this.renderTableData() }
               </tbody>
            </table>
         </div>
        )
    }
}

export default Attempt;