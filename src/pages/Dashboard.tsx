import { message } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AccountGroupsList from '../components/accountGroup/AccountGroupsList';
import { useQueryParams } from '../components/helpers/storeHelper';
import { PrivateRouteProps } from './routes/PrivateRoute';
import './styles/dashboard.scss';
import { DEFAULT_SUCCESS_MESSAGE_DURATION } from '../utils/appVars';

const Dashboard = ({ updateHeaderTitle }: PrivateRouteProps) => {
  const { t } = useTranslation();

  const queryParams = useQueryParams();

  useEffect(() => {
    updateHeaderTitle(t('dashboard.title'));
    if (queryParams.get('accountDeleted')) {
      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );
    }
  }, [t]);

  return (
    <>
      <div className="dashboard-page__container">
        <AccountGroupsList />
      </div>
    </>
  );
};

export default Dashboard;
