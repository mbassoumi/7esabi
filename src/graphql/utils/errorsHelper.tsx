import { ApolloError } from '@apollo/client';
import { message } from 'antd';
import { TFunction } from 'i18next';
import React from 'react';
import { Redirect } from 'react-router-dom';
import InternalError from '../../components/shared/InternalError';
import LanguageSelector from '../../components/shared/LanguageSelector';
import { DEFAULT_OAUTH_URL } from '../../utils/envVars';

export const handleApolloError = (error: ApolloError) => {
  console.log('Error', error, error.graphQLErrors);
  if (error.message?.startsWith('Access denied!')) {
    const originalPath = window.location?.pathname
      ? encodeURIComponent(window.location!.pathname!.substr(1) || '')
      : null;

    const redirectUrl =
      error.graphQLErrors[0].extensions!.data!.redirectUrl || DEFAULT_OAUTH_URL;

    return (
      <Redirect
        to={{ pathname: `/welcome`, state: { originalPath, redirectUrl } }}
      />
    );
  }

  return (
    <div>
      <InternalError />
      <LanguageSelector></LanguageSelector>
    </div>
  );
};

export const showGenericOperationFailedMessage = (error: any, t: TFunction) => {
  console.log('generic error');
  message.error(t('generic.errors.operationFailed'));
};
