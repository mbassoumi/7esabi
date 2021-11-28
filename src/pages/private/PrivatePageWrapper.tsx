import React, { ComponentProps, FC, useState } from 'react';
import UserSessionMenu from '../../components/shared/UserSessionMenu';
import Header from '../../components/shared/Header';
import LoadingPage from '../../components/shared/LoadingPage';
import './styles/privatePageWrapper.scss';
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
export interface PrivatePageProps {
  updateHeaderTitle: (title: string) => any;
}

export interface PrivatePageWrapperProps extends ComponentProps<any> {
  component: FC<any>;
}

interface PrivatePageWrapperState {
  headerTitle: string;
  forcedLoading: boolean;
}

const PrivatePageWrapper = ({
  component: Component,
  ...rest
}: PrivatePageWrapperProps) => {
  const { isLoading: isCurrentUserLoading, data: currentUser } = useQuery<User>(
    queryKeyForCurrentUser(),
    getCurrentUserApi
  );

  // preload all users list
  const { isLoading: isAllUsersLoading, data: allUsers } = useQuery<User[]>(
    queryKeyForAllUsers(),
    listUsersApi,
    {
      enabled: !isCurrentUserLoading && !isEmpty(currentUser),
    }
  );

  const [state, setState] = useState<PrivatePageWrapperState>({
    headerTitle: '',
    forcedLoading: false,
  });

  if (isCurrentUserLoading || isAllUsersLoading || state.forcedLoading)
    return <LoadingPage />;

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
        <>
          <div className="private-page-wrapper">
            <Header title={state.headerTitle} actions={<UserSessionMenu />} />
            {
              // @ts-ignore
              <Component {...rest} updateHeaderTitle={updateHeaderTitle} />
            }
          </div>
          <LanguageSelector setLoading={setForcedLoading} />
        </>
      )}
    </>
  );
};

export default PrivatePageWrapper;
