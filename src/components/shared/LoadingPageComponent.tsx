import { Layout, Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles/loadingPageComponent.scss';

const LoadingPageComponent = () => {
  const { t } = useTranslation();

  return (
    <Layout className="loading-page">
      <Layout.Header className="loading-page__header"></Layout.Header>
      <Layout.Content className="loading-page__content">
        <div className="loading-page__content__text">
          {t('generic.messages.loadingPleaseWait')}
        </div>
        <div className="loading-page__content__spinner">
          <Spin size="large" />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default LoadingPageComponent;
