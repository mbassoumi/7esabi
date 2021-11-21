import {
  faHandHoldingUsd,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProps } from 'react-router-dom';
import '../styles/landingPage.scss';
import { DEFAULT_OAUTH_URL } from '../../utils/envVars';
import { useQuery } from 'react-query';
import { User } from '../../@types/User';
import { getCurrentUserApi } from '../../api/session';
import LoadingPage from '../../components/shared/LoadingPage';
import { queryKeyForCurrentUser } from '../../components/helpers/storeHelper';

const LandingPage = (_params: RouteProps) => {
  const { t } = useTranslation();

  const {
    isLoading,
    isError,
    error,
    data: currentUser,
  } = useQuery<User>(queryKeyForCurrentUser(), getCurrentUserApi, {
    retry: false,
    refetchOnWindowFocus: false,
    useErrorBoundary: false,
  });

  useEffect(() => {
    if (!isLoading && !isEmpty(currentUser)) {
      window.location.assign(`/`);
    }
  }, [currentUser]);

  if (isLoading) return <LoadingPage />;

  const onLoginClick = (_event: any) => {
    window.location.href = DEFAULT_OAUTH_URL;
  };

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
