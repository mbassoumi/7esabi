import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivatePageWrapper from './private/PrivatePageWrapper';
import PublicPageWrapper from './public/PublicPageWrapper';
import DashboardPage from './private/DashboardPage';
import LandingPage from './public/LandingPage';
import NotFoundPage from './public/NotFoundPage';
import OauthCallbackPage from './public/OauthCallbackPage';
import AccountPage from './private/AccountPage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => <PrivatePageWrapper component={DashboardPage} />}
        />

        <Route
          path="/accountGroup/:accountGroupId/account/:id"
          exact={true}
          render={() => <PrivatePageWrapper component={AccountPage} />}
        />

        <Route
          path="/oauth_callback"
          exact={true}
          render={() => <PublicPageWrapper component={OauthCallbackPage} />}
        />

        <Route
          path="/welcome"
          render={() => <PublicPageWrapper component={LandingPage} />}
        />

        <Route
          path="*"
          render={() => <PublicPageWrapper component={NotFoundPage} />}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
