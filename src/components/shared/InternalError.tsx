import { Layout } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InternalErrorImage from '../../assets/internalErrorImage.jpg';

const InternalError = () => {
  const { t } = useTranslation();

  return (
    <Layout style={{ background: 'none' }}>
      <div style={{ marginTop: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>
          {t('generic.errors.internalError')}
        </h1>
      </div>
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <img src={InternalErrorImage} alt={'Internal Error'}></img>
      </div>
    </Layout>
  );
};

export default InternalError;
