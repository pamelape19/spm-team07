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
                 <td  id={ outcome }>{ score }/total score</td>
                 <td id={ outcome }>{ text }</td>
              </tr>
           )
        })
     }
    render(){
         let quizAttemptResults;
         if (this.props.learnerResults.length === 0){
            quizAttemptResults = <h5>No quiz attempt results available.</h5>
         }
         else{
            quizAttemptResults = <table id='scores' style={{ width: '100%', marginTop: 20 }}>
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
         }
        return(
            <div>
            <h1 id='title'>Quiz Submissions - { this.props.courseName }</h1>
            { quizAttemptResults }
         </div>
        )
    }
}

export default Attempt;