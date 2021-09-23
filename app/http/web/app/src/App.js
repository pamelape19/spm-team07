import { withRouter } from 'react-router-dom';
import Routes from './routes.js';
import React, { Component, Fragment } from 'react';
import './App.css';
import TopNav from './components/nav/TopNav.js';
import Footer from './components/nav/Footer.js';

class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Fragment>
          <TopNav/>
          <div className="App" id="app">
            <Routes/>
          </div>
          <Footer/>
      </Fragment>
    )
  }
}

export default withRouter(App);