import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import LearnersHome from './pages/learners/LearnersHome';
import LearnersEnrolled from './pages/learners/LearnersEnrolled';
import LearnersCompleted from './pages/learners/LearnersCompleted';
import TrainersHome from './pages/trainers/TrainersHome';
import HrHome from './pages/hr/HrHome';

class AllRoutes extends Component {
    render(){
        return (
            <Fragment>
                <Route exact path="/" component={ LearnersHome }/>
                <Route exact path="/learners-home" component={ LearnersHome }/>
                <Route exact path="/learners-enrolled" component={ LearnersEnrolled }/>
                <Route exact path="/learners-completed" component={ LearnersCompleted }/>
                <Route exact path="/trainers-home" component={ TrainersHome }/>
                <Route exact path="/hr-home" component={ HrHome }/>
            </Fragment>
        )
    }
}

export default AllRoutes;