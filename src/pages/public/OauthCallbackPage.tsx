import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQueryParams } from '../../components/helpers/storeHelper';
import LoadingPage from '../../components/shared/LoadingPage';
import InternalError from '../../components/shared/InternalError';
import { useQuery } from 'react-query';
import { User } from '../../@types/User';
import { getOauthCallbackApi } from '../../api/session';
import { isEmpty } from 'lodash';

const OauthCallbackPage = () => {
  const queryParams = useQueryParams();
  const codeParam = queryParams.get('code');
  const stateParam = queryParams.get('state');
  // console.log('**** code', codeParam);
  // console.log('**** state', stateParam);

  if (isEmpty(codeParam || stateParam)) {
    console.error(`empty codeParam or stateParam`, codeParam, stateParam);
    return <InternalError />;
  }

  const { isLoading, isError, error } = useQuery<User>(
    'auth_callback',
    () => getOauthCallbackApi({ code: codeParam!, state: stateParam! }),
    { retry: false }
  );

  if (isLoading) return <LoadingPage />;

  if (isError) {
    console.error('callback api errpr', error);
    return <InternalError />;
  }

  return <Redirect to={{ pathname: `/` }} />;
};

export default OauthCallbackPage;
