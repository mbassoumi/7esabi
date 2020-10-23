import { useQuery } from '@apollo/client';
import {
  faHandHoldingUsd,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProps } from 'react-router-dom';
import LoadingPageComponent from '../../components/shared/LoadingPageComponent';
import { SESSION_DATA_QUERY } from '../../graphql/gql/auth/sessionData';
import { GqlSessionDataQuery } from '../../graphql/gql/auth/types/GqlSessionDataQuery';
import { DEFAULT_OAUTH_URL } from '../../utils/envVars';
import '../styles/landingPage.scss';

const LandingPage = ({ location }: RouteProps) => {
  const { t } = useTranslation();
  const { loading, data } = useQuery<GqlSessionDataQuery>(SESSION_DATA_QUERY, {
    fetchPolicy: 'cache-only',
  });

  const onLoginClick = (event: any) => {
    if (!isEmpty(data?.sessionData)) {
      window.location.assign(`/`);
      return;
    }

    const locationState = location?.state as any;
    const loginUrl = locationState?.redirectUrl || DEFAULT_OAUTH_URL;
    const originalPath = locationState?.originalPath;
    const stateParam = isEmpty(originalPath) ? '' : `&state=${originalPath}`;

    window.location.href = `${loginUrl}${stateParam}`;
  };

  if (loading) return <LoadingPageComponent />;

  return (
    <Layout className="landing-page">
      <Layout.Header className="landing-page__header">
        <h1 className="landing-page__header__text">
          {t('generic.messages.welcome')}
        </h1>
      </Layout.Header>
      <Layout.Content>
        <div className="landing-page__content">
          <div className="landing-page__content__icons-line-2">
            <FontAwesomeIcon icon={faHandHoldingUsd} />
          </div>
          <div className="landing-page__content__login">
            <Button
              onClick={onLoginClick}
              className="landing-page__content__login__button"
            >
              {t('generic.links.goToLogin')}
            </Button>
          </div>
          <div className="landing-page__content__icons-line-1">
            <FontAwesomeIcon icon={faUniversity} />
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default LandingPage;
