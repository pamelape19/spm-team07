import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import LearnersHome from './pages/learners/LearnersHome';
import TrainersHome from './pages/trainers/TrainersHome';

class AllRoutes extends Component {
    render(){
        return (
            <Fragment>
                <Route exact path="/" component={Home}/>
                <Route exact path="/learners-home" component={LearnersHome}/>
                <Route exact path="/trainers-home" component={TrainersHome}/>

            </Fragment>
        )
    }
}

export default AllRoutes;