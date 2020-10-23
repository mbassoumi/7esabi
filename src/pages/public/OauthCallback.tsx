import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQueryParams } from '../../components/helpers/storeHelper';
import { GQL_LOGIN } from '../../graphql/gql/auth/login';
import { GqlLogin } from '../../graphql/gql/auth/types/GqlLogin';
import LoadingPageComponent from '../../components/shared/LoadingPageComponent';
import '../styles/login.scss';
import { isEmpty } from 'lodash';
import InternalError from '../../components/shared/InternalError';

const OauthCallback = () => {
  const queryParams = useQueryParams();
  const codeParam = queryParams.get('code');
  const stateParam = queryParams.get('state');
  console.log('**** code', codeParam);
  console.log('**** state', stateParam);

  // using "loading" in a local state because the loading from the mutation
  // doesn't update correctly when the function is called in useEffect
  const [loginFn] = useMutation<GqlLogin>(GQL_LOGIN);
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    loginFn({ variables: { code: codeParam } })
      .then((result) => setState({ loading: false, error: null }))
      .catch((error) => setState({ loading: false, error: error }));
  }, [loginFn, codeParam]);

  if (state.loading) return <LoadingPageComponent />;

  if (state.error) return <InternalError />;

  const redirectPath = isEmpty(stateParam) ? '' : stateParam!;
  return <Redirect to={{ pathname: `/${redirectPath}` }} />;
};

export default OauthCallback;
