import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import '../styles/publicPage.scss';
import LanguageSelector from '../../components/shared/LanguageSelector';

const PublicRoute = ({ component: Component, ...rest }: RouteProps) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <div className="public-page">
            {
              //@ts-ignore
              <Component {...props} />
            }
          </div>
        )}
      />
      <LanguageSelector />
    </>
  );
};

export default PublicRoute;
