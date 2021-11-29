import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import AccountCard from '../../components/account/AccountCard';
import { queryKeyForAccount } from '../../components/helpers/storeHelper';
import NotFoundPage from '../public/NotFoundPage';
import { PrivatePageProps } from './PrivatePageWrapper';
import './styles/accountPage.scss';
import { useQuery } from 'react-query';
import { getAccountApi } from '../../api/account';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import TransactionsList from '../../components/accountTransaction/TransactionsList';

interface AccountPageParams {
  accountGroupId?: string;
  id?: string;
}

const AccountPage = ({ updateHeaderTitle }: PrivatePageProps) => {
  const { accountGroupId, id } = useParams();
  const accountGroupIdParsed = Number(accountGroupId || 0);
  const idParsed = Number(id || 0);

  const { isLoading, data: account } = useQuery(
    queryKeyForAccount(idParsed),
    () => getAccountApi(accountGroupIdParsed, idParsed)
  );

  useEffect(() => {
    if (account) {
      updateHeaderTitle(`${account.name}`);
    }
  }, [account]);

  if (isLoading) return <LoadingSpinner />;
  if (!account) return <NotFoundPage />;

  return (
    <>
      <div className="account-page__container">
        <div className="account-page__account-card">
          <AccountCard account={account!} isInFullAccountMode />
        </div>
        <div className="account-page__transactions-list">
          <TransactionsList accounts={[account!]} singleAccountMode />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
