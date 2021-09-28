import React, { Component, } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./topnav.css";
import logo from '../../resources/logo.png';
import avatar from '../../resources/avatar.png';

class TopNav extends Component{
    render(){
        return (
            <div class="shadow-sm menu">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home"><img src={logo} alt=""/> Printrainer </Navbar.Brand>
                        <Nav className="mr-auto">
                            <NavLink exact to='/learners-home' style={{padding: 15}}>For Learners</NavLink>
                            <Navbar.Text style={{fontWeight: 400, fontSize: '1.4em'}}> | </Navbar.Text>
                            <NavLink exact to='/trainers-home' style={{padding: 15}}>For Trainers</NavLink>
                            <Navbar.Text style={{fontWeight: 400, fontSize: '1.4em'}}> | </Navbar.Text>
                            <NavLink exact to='/hr-home' style={{padding: 15}}>For Hr</NavLink>
                            <img src={avatar} alt="" style={{height: '50px'}}/>
                        </Nav>
                    </Container>
                    </Navbar>

            </div>
        )
    }
}
    


export default TopNav;