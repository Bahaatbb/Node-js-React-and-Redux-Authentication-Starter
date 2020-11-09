import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile';
import NotFound from '../components/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
    return (
        <section className="container">
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
