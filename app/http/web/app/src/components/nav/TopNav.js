import React, { Component, } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/topnav.css";
import logo from '../../resources/logo.png';
import avatar from '../../resources/avatar.png';

class TopNav extends Component{
    render(){
        return (
            <div className="shadow-sm menu">
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Brand exact to='/'><img src={ logo } alt=""/> Printrainer </Navbar.Brand>
                        <Nav className="mr-auto">
                            <NavLink exact to='/learners-home' style={{ padding: 15 }}>For Learners</NavLink>
                            <Navbar.Text style={{ fontWeight: 400, fontSize: '1.4em' }}> | </Navbar.Text>
                            <NavLink exact to='/trainers-home' style={{ padding: 15 }}>For Trainers</NavLink>
                            <Navbar.Text style={{ fontWeight: 400, fontSize: '1.4em' }}> | </Navbar.Text>
                            <NavLink exact to='/admin-home' style={{ padding: 15 }}>For Admin</NavLink>
                            <img src={ avatar } alt="" style={{ height: '50px' }}/>
                        </Nav>
                    </Container>
                    </Navbar>

            </div>
        )
    }
}

export default TopNav;