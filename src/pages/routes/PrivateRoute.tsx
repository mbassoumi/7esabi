import React, { useState } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import UserSessionMenu from '../../components/shared/UserSessionMenu';
import Header from '../../components/shared/Header';
import LoadingPage from '../../components/shared/LoadingPage';
import '../styles/privatePage.scss';
import { User } from '../../@types/User';
import { useQuery } from 'react-query';
import { getCurrentUserApi } from '../../api/session';
import {
  queryKeyForAllUsers,
  queryKeyForCurrentUser,
} from '../../components/helpers/storeHelper';
import { listUsersApi } from '../../api/user';
import { isEmpty } from 'lodash';
import LanguageSelector from '../../components/shared/LanguageSelector';

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
  const { isLoading, data: currentUser } = useQuery<User>(
    queryKeyForCurrentUser(),
    getCurrentUserApi
  );

  // preload all users list
  const { isLoading: isLoading2, data: allUsers } = useQuery<User[]>(
    queryKeyForAllUsers(),
    listUsersApi,
    {
      enabled: !isLoading && !isEmpty(currentUser),
    }
  );

  const [state, setState] = useState<PrivateRouteState>({
    headerTitle: '',
    forcedLoading: false,
  });

  if (isLoading || state.forcedLoading) return <LoadingPage />;

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
      {currentUser && (
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
      )}
      <LanguageSelector setLoading={setForcedLoading} />
    </>
  );
};

export default PrivateRoute;
