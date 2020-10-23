import { ConfigProvider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Routes from './Routes';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div dir={i18n.dir()}>
        <Routes />
      </div>
    </ConfigProvider>
  );
};

export default App;
