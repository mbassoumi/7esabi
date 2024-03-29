import { ConfigProvider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PageRoutes from './pages/PageRoutes';
import GenericErrorBoundary from './components/shared/GenericErrorBoundary';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';

const App = (): any => {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider direction={i18n.dir()}>
      <div dir={i18n.dir()}>
        <GenericErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <PageRoutes />
          </QueryClientProvider>
        </GenericErrorBoundary>
      </div>
    </ConfigProvider>
  );
};

export default App;
