import { React, Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import banner from '../../resources/coursePageBanner1.png';
import './coursePage.css';

class CoursePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{margin: '3% 0'}}>
                <img src={banner} alt="" style={{width: '100%'}}/>
                <Container style={{marginTop: '5%'}}>
                    <div className='top'>
                        <div>
                            <h1>Basics of 3D Printing</h1>
                            <p>Course Duration:  DDMMYY - DDMMYY</p>
                        </div>
                        <Button variant="primary" className="enrol-btn">Enrol</Button>
                    </div>
                    <h2>Course Description</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                    mollit anim id est laborum.
                    </p>
                </Container>
            </div>
        )
    }
}

export default CoursePage;