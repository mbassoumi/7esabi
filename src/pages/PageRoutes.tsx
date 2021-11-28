import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicPageWrapper from './public/PublicPageWrapper';
import NotFoundPage from './public/NotFoundPage';
import LandingPage from './public/LandingPage';
import PrivatePageWrapper from './private/PrivatePageWrapper';
import DashboardPage from './private/DashboardPage';
import AccountPage from './private/AccountPage';
import OauthCallbackPage from './public/OauthCallbackPage';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivatePageWrapper page={DashboardPage} />} />

        <Route
          path="/accountGroup/:accountGroupId/account/:id"
          element={<PrivatePageWrapper page={AccountPage} />}
        />

        <Route
          path="/oauth_callback"
          element={<PublicPageWrapper page={OauthCallbackPage} />}
        />

        <Route
          path="/welcome"
          element={<PublicPageWrapper page={LandingPage} />}
        />

        <Route path="*" element={<PublicPageWrapper page={NotFoundPage} />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
