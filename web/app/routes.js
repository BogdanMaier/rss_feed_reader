import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './components/Login';
import ClientDashboard from './containers/Dashboard';
import Logout from './components/Logout';

import {
    requiresAuth,
} from './utils/Permissions';

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={ (props) =>   {
                return ( !requiresAuth(props) &&
                    <div className="client">
                        <Helmet>
                            <title>Dashboard</title>
                        </Helmet>
                        <ClientDashboard {...props} client/>
                        <Logout/>
                    </div>
                );
            }} />
            <Route exact path="/login" component={Login}/>
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
);
