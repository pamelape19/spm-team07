import { React, Component } from 'react';

class Footer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{ background: "#ECF6FF", color: "#000000", padding: 10, marginBottom: 0 }}>
                <center>
                    ©2021. Software Project Management.
                </center>
            </div>
        );
    }
}

export default Footer;