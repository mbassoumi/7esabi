import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { SESSION_DATA_QUERY } from '../../graphql/gql/auth/sessionData';
import { GqlSessionDataQuery } from '../../graphql/gql/auth/types/GqlSessionDataQuery';
import { handleApolloError } from '../../graphql/utils/errorsHelper';
import UserSessionMenu from '../../components/shared/userSessionMenu';
import Header from '../../components/shared/Header';
import LanguageSelector from '../../components/shared/LanguageSelector';
import LoadingPageComponent from '../../components/shared/LoadingPageComponent';
import '../styles/privatePage.scss';

// to be used by the the entry page which is wrapped inside this page
export interface PrivateRouteProps extends RouteComponentProps {
  updateHeaderTitle: (title: string) => any;
}

interface PrivateRouteState {
  headerTitle: string;
  forcedLoading: boolean;
}

const PrivateRoute = ({
  component: Component,
  location,
  ...rest
}: RouteProps) => {
  const { loading, error } = useQuery<GqlSessionDataQuery>(SESSION_DATA_QUERY);
  const [state, setState] = useState({
    headerTitle: '',
    forcedLoading: false,
  } as PrivateRouteState);

  if (loading || state.forcedLoading) return <LoadingPageComponent />;
  if (error) return handleApolloError(error);

  const updateHeaderTitle = (title: string) => {
    setState((state) => ({
      ...state,
      headerTitle: title,
    }));
  };

  const setForcedLoading = (loading: boolean) => {
    setState((state) => ({ ...state, forcedLoading: loading }));
  };

  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <div className="private-page">
            <Header title={state.headerTitle} actions={<UserSessionMenu />} />
            {
              // @ts-ignore
              <Component {...props} updateHeaderTitle={updateHeaderTitle} />
            }
          </div>
        )}
      />
      <LanguageSelector setLoading={setForcedLoading} />
    </>
  );
};

export default PrivateRoute;
