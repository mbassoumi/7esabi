import { Alert, Button, List } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TransactionCard from './TransactionCard';
import './styles/transactionsList.scss';
import { Account } from '../../@types/Account';
import { useQuery } from 'react-query';
import {
  getCachedCurrentUser,
  queryKeyForAccountTransactionsList,
  refreshAccount,
} from '../helpers/storeHelper';
import { listTransactionsApi } from '../../api/accountTransactions';
import { showGenericOperationFailedMessage } from '../../utils/helpers';
import TransactionFormModal from './TransactionFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface TransactionsListProps {
  account: Account;
}

interface TransactionsListState {
  currentPage: number;
  transactionFormModalVisible: boolean;
}

const DEFAULT_PAGE_SIZE = 3;
const TransactionsList = ({ account }: TransactionsListProps) => {
  const { t } = useTranslation();
  const currentUser = getCachedCurrentUser();
  const accountGroup = account!.account_group;
  const isAccountForCurrentUser = currentUser.id === accountGroup.user_id;

  const [state, setState] = useState<TransactionsListState>({
    currentPage: 1,
    transactionFormModalVisible: false,
  });

  const {
    isLoading,
    error,
    data: transactionsList,
    isPreviousData,
  } = useQuery(
    queryKeyForAccountTransactionsList(account.id).concat([state.currentPage]),
    () => listTransactionsApi(account.id, state.currentPage, DEFAULT_PAGE_SIZE),
    {
      keepPreviousData: true,
      useErrorBoundary: false,
      onError: (e) => setCurrentPage(1),
    }
  );

  const onPageChange = (page: number) => setCurrentPage(page);

  const setCurrentPage = (page: number) => {
    setState((state) => ({ ...state, currentPage: page }));
  };

  const closeModals = (saved = false) => {
    setState((state) => ({
      ...state,
      currentPage: saved ? 1 : state.currentPage,
      transactionFormModalVisible: false,
    }));
  };

  /*
   * Add Transaction
   */

  const onSaveTransaction = async (mutationInfo: any) => {
    await refreshAccount(account.id);
    closeModals(true);
  };

  const transactionFormModal = state.transactionFormModalVisible && (
    <TransactionFormModal
      onSave={onSaveTransaction}
      onCancel={closeModals}
      account={account!}
    />
  );

  const openTransactionFormModal = (event: any) => {
    setState((state) => ({
      ...state,
      transactionFormModalVisible: true,
    }));
  };

  const addTransactionsButton = isAccountForCurrentUser && (
    <div className="transactions-list-component__add-transactions">
      <Button
        className="transactions-list-component__add-transactions__button"
        onClick={openTransactionFormModal}
      >
        <FontAwesomeIcon icon={faPlus} color="green" />
        <span>{t('transaction.actions.add')}</span>
      </Button>
    </div>
  );

  /*
   * ui
   */

  if (error) showGenericOperationFailedMessage(error, t);

  return (
    <div className="transactions-list-component">
      {addTransactionsButton}
      {error && (
        <Alert message={t('generic.errors.dataIncomplete')} type={'error'} />
      )}
      <div className="transactions-list">
        <List
          key={'transaction_list_paginated'}
          itemLayout="vertical"
          loading={isLoading}
          pagination={{
            current: state.currentPage,
            onChange: onPageChange,
            pageSize: DEFAULT_PAGE_SIZE,
            defaultPageSize: DEFAULT_PAGE_SIZE,
            total: account.total_transactions_count || 0,
            disabled: isLoading || isPreviousData,
          }}
          dataSource={transactionsList || []}
          renderItem={(transaction) => (
            <List.Item key={transaction.id} className="transactions-list__item">
              <TransactionCard
                key={`transaction_card_in_list_for_${transaction.id}`}
                account={account}
                transaction={transaction}
              />
            </List.Item>
          )}
        />
      </div>
      {transactionFormModal}
    </div>
  );
};

export default TransactionsList;
