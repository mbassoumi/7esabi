import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AccountCard from '../components/account/AccountCard';
import {
  useAccount,
  useAccountGroup,
  useCurrentUser,
} from '../components/helpers/storeHelper';
import TransactionsList from '../components/transaction/TransactionsList';
import NotFound from './public/NotFound';
import { PrivateRouteProps } from './routes/PrivateRoute';
import './styles/account.scss';

interface AccountPageState {
  initialTransactionsListPage: number;
}
const Account = ({ updateHeaderTitle }: PrivateRouteProps) => {
  //@ts-ignore
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const account = useAccount(id);
  const accountGroup = useAccountGroup(account?.accountGroup?.id || null);

  useEffect(() => {
    if (account) {
      updateHeaderTitle(`${account.fullName}`);
    }
  }, [account]);

  console.log('acccountttttttt', account, accountGroup, currentUser);

  const [state, setState] = useState({
    initialTransactionsListPage: 1,
  } as AccountPageState);

  const resetTransactionsList = () => {
    // 2 state updates to force the useEffect in TransactionsList to re-render,
    // otherwise the initial would always be 1 and won't force a rerender.
    setState((state) => ({ ...state, initialTransactionsListPage: 0 }));
    setState((state) => ({
      ...state,
      initialTransactionsListPage: 1,
    }));
  };

  const accountPageContent = () => (
    <div className="account-page__container">
      <div className="account-page__account-card">
        <AccountCard
          account={account!}
          accountGroup={accountGroup}
          isInFullAccountMode
          resetTransactionsList={resetTransactionsList}
        />
      </div>
      <div className="account-page__transactions-list">
        <TransactionsList
          account={account!}
          initialTransactionsListPage={state.initialTransactionsListPage}
        />
      </div>
    </div>
  );

  return account ? accountPageContent() : <NotFound />;
};

export default Account;
