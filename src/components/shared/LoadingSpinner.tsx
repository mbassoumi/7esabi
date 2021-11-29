import { Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles/loadingPageComponent.scss';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="loading-page__content">
      <div className="loading-page__content__text">
        {t('generic.messages.loadingPleaseWait')}
      </div>
      <div className="loading-page__content__spinner">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
