import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './i18n';
import * as serviceWorker from './serviceWorker';
import { QueryClient, QueryClientProvider } from 'react-query';
import GenericErrorBoundary from './components/shared/GenericErrorBoundary';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 120, // 120 seconds
      cacheTime: 1000 * 120, // 120 seconds
      refetchOnMount: 'always',
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
      refetchInterval: 1000 * 120, // 120 seconds
      refetchIntervalInBackground: false,
      suspense: false,
      useErrorBoundary: (error: any) => {
        const status = error?.response?.status;
        return status && (status === 401 || status >= 500);
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.render(
  <GenericErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </QueryClientProvider>
  </GenericErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
