import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AccountFormModal from './components/account/AccountFormModal';
import PrivateRoute from './pages/routes/PrivateRoute';
import PublicRoute from './pages/routes/PublicRoute';
import TransactionFormModal from './components/transaction/TransactionFormModal';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/public/LandingPage';
import NotFound from './pages/public/NotFound';
import OauthCallback from './pages/public/OauthCallback';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute component={Dashboard} path="/" exact={true} />

        <PrivateRoute
          component={AccountFormModal}
          path="/account/create"
          exact={true}
        />
        <PrivateRoute component={Account} path="/account/:id" exact={true} />
        <PrivateRoute
          component={AccountFormModal}
          path="/account/:id/edit"
          exact={true}
        />

        <PrivateRoute
          component={TransactionFormModal}
          path="/transaction/create"
          exact={true}
        />
        {/*<PrivateRoute component={Account} path="/transaction/:id" exact={true}/>*/}
        <PrivateRoute
          component={TransactionFormModal}
          path="/transaction/:id/edit"
          exact={true}
        />

        <PrivateRoute component={Dashboard} path="/" exact={true} />

        <PublicRoute
          component={OauthCallback}
          exact={true}
          path="/oauth_callback"
        />
        <PublicRoute path="/welcome" component={LandingPage} />
        <PublicRoute path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
