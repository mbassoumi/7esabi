import { Layout } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageNotFoundImage from '../../assets/pageNotFound.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Layout style={{ background: 'none' }}>
      <div style={{ marginTop: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>
          {t('generic.errors.pageNotFound')}
        </h1>
        <h2 style={{ textAlign: 'center' }}>
          <Link to="/">{t('generic.links.goToHomePage')}</Link>
        </h2>
      </div>
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <img src={PageNotFoundImage} alt={'Page Not Found'}></img>
      </div>
    </Layout>
  );
};

export default NotFound;
