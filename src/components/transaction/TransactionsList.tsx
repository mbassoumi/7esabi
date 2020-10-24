import { useQuery } from '@apollo/client';
import { Alert, List } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { GQL_TRANSACTIONS_PAGINATED } from '../../graphql/gql/transaction/getPaginated';
import { GqlTransactionsPaginated } from '../../graphql/gql/transaction/types/GqlTransactionsPaginated';
import { showGenericOperationFailedMessage } from '../../graphql/utils/errorsHelper';
import TransactionCard from './TransactionCard';
import './styles/transactionsList.scss';

interface TransactionsListProps {
  account: GqlFragmentAccount;
  initialTransactionsListPage: number;
}

interface TransactionsListState {
  currentPage: number;
}

const DEFAULT_PAGE_SIZE = 10;
const TransactionsList = ({
  account,
  initialTransactionsListPage = 1,
}: TransactionsListProps) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    currentPage: 1,
  } as TransactionsListState);

  const { loading, error, data, fetchMore } = useQuery<
    GqlTransactionsPaginated
  >(GQL_TRANSACTIONS_PAGINATED, {
    skip: isEmpty(account),
    variables: {
      accountId: account!.id,
      take: DEFAULT_PAGE_SIZE,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (
      initialTransactionsListPage === 0 ||
      initialTransactionsListPage === state.currentPage
    )
      return;

    setCurrentPage(initialTransactionsListPage);
  }, [initialTransactionsListPage]);

  console.log('transactions list');

  const onPageChange = async (page: number, pageSize?: number) => {
    const limit = pageSize || DEFAULT_PAGE_SIZE;
    const skip = skipForPage(page, limit);
    await fetchMore({ variables: { skip, limit } });
    setCurrentPage(page);
  };

  const skipForPage = (page: number, pageSize?: number) => {
    const limit = pageSize || DEFAULT_PAGE_SIZE;
    return (page - 1) * limit;
  };

  const setCurrentPage = (page: number) => {
    setState((state) => ({ ...state, currentPage: page }));
  };

  /*
   * ui
   */

  if (error) showGenericOperationFailedMessage(error, t);

  return (
    <>
      {error && (
        <Alert message={t('generic.errors.dataIncomplete')} type={'error'} />
      )}
      <div className="transactions-list">
        <List
          key={'transaction_list_paginated'}
          itemLayout="vertical"
          loading={loading}
          pagination={{
            current: state.currentPage,
            onChange: onPageChange,
            pageSize: DEFAULT_PAGE_SIZE,
            defaultPageSize: DEFAULT_PAGE_SIZE,
            total: account.transactionsCount || 0,
          }}
          dataSource={data?.transactions || []}
          renderItem={(transaction) => (
            <List.Item key={transaction.id} className="transactions-list__item">
              <TransactionCard
                key={`transaction_card_in_list_for_${transaction.id}`}
                account={account}
                transaction={transaction}
                refreshTransactionsPaginationArgs={{
                  skip: skipForPage(state.currentPage),
                  take: DEFAULT_PAGE_SIZE,
                }}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default TransactionsList;
