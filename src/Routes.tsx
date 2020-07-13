import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AccountForm from "./pages/AccountForm";
import TransactionForm from "./pages/TransactionForm";



const Routes = () => {

    return (
        <Router>
            <Switch>
                <PublicRoute component={Login} exact={true} path="/login"/>
                <PrivateRoute component={Dashboard} path="/" exact={true}/>

                <PrivateRoute component={AccountForm} path="/account/create" exact={true}/>
                <PrivateRoute component={Account} path="/account/:id" exact={true}/>
                <PrivateRoute component={AccountForm} path="/account/:id/edit" exact={true}/>

                <PrivateRoute component={TransactionForm} path="/transaction/create" exact={true}/>
                {/*<PrivateRoute component={Account} path="/transaction/:id" exact={true}/>*/}
                <PrivateRoute component={TransactionForm} path="/transaction/:id/edit" exact={true}/>


                <PrivateRoute component={Dashboard} path="/" exact={true}/>
            </Switch>
        </Router>
    );
};

export default Routes;