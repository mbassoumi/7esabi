import { Alert, Button, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
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
import {
  convertApiDateStringToDate,
  convertDateToApiDateString,
  showGenericOperationFailedMessage,
} from '../../utils/helpers';
import TransactionFormModal from './TransactionFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from '../shared/DatePicker';
import {
  listTransactionsApi,
  TransactionFilters,
} from '../../api/transactions';
import { find } from 'lodash';

interface TransactionsListProps {
  accounts: Account[];
  singleAccountMode?: boolean;
}

interface TransactionsListState {
  currentPage: number;
  filters: TransactionFilters;
  filtersDraft: TransactionFilters;
  filtersDraftApplied: boolean;
  transactionFormModalVisible: boolean;
}

const DEFAULT_PAGE_SIZE = 3;
const TransactionsList = ({
  accounts,
  singleAccountMode,
}: TransactionsListProps) => {
  const { t } = useTranslation();
  const currentUser = getCachedCurrentUser();
  const singleAccount = singleAccountMode ? accounts[0] : null;
  const editMode =
    !!singleAccount && currentUser.id === singleAccount.account_group.user_id;

  const accountForId = (id: number) =>
    singleAccountMode
      ? singleAccount!
      : find(accounts, (account) => account.id === id);

  const initialState = (accounts: Account[]): TransactionsListState => {
    const accountIds = accounts.map((account) => account.id);
    return {
      currentPage: 1,
      transactionFormModalVisible: false,
      filters: { account_ids: accountIds },
      filtersDraft: { account_ids: accountIds },
      filtersDraftApplied: true,
    };
  };

  const [state, setState] = useState<TransactionsListState>(
    initialState(accounts)
  );

  // to force re-render when passed accounts changes
  useEffect(() => {
    setState(initialState(accounts));
  }, [JSON.stringify(accounts.map((account) => account.id))]);

  const queryKeyBase = singleAccountMode
    ? queryKeyForAccountTransactionsList(singleAccount!.id)
    : (['combinedTransactionsList', JSON.stringify(state.filters)] as any);

  const {
    isLoading,
    error,
    data: transactionsResponse,
    isPreviousData,
  } = useQuery(
    queryKeyBase.concat([state.currentPage]),
    () =>
      listTransactionsApi(state.filters, state.currentPage, DEFAULT_PAGE_SIZE),
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
   * shown in singleAccountMode only
   */

  const onSaveTransaction = async (mutationInfo: any) => {
    await refreshAccount(singleAccount!.id);
    closeModals(true);
  };

  const transactionFormModal = state.transactionFormModalVisible && (
    <TransactionFormModal
      onSave={onSaveTransaction}
      onCancel={closeModals}
      account={singleAccount!}
    />
  );

  const openTransactionFormModal = (event: any) => {
    setState((state) => ({
      ...state,
      transactionFormModalVisible: true,
    }));
  };

  const addTransactionsButton = editMode && (
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
   * Filters
   */

  const onDateFilterChange = (
    filterField: 'start_date' | 'end_date',
    selectedDate: Date | null
  ) => {
    setState((state) => {
      const filtersDraft = { ...state.filtersDraft };
      if (selectedDate) {
        filtersDraft[filterField] = convertDateToApiDateString(selectedDate);
      } else {
        delete filtersDraft[filterField];
      }
      return {
        ...state,
        filtersDraft,
        filtersDraftApplied: false,
      };
    });
  };

  const transactionsDateFilter = (filterField: 'start_date' | 'end_date') => (
    <DatePicker
      allowClear={true}
      className="transaction-filters__input__date"
      defaultValue={
        state.filters[filterField]
          ? convertApiDateStringToDate(state.filters[filterField]!)
          : undefined
      }
      format="YYYY/MM/DD"
      name={filterField}
      placeholder={
        filterField === 'start_date'
          ? t('transaction.filters.startDate')
          : t('transaction.filters.endDate')
      }
      onChange={(selectedDate: Date | null, dateString: string | null) =>
        onDateFilterChange(filterField, selectedDate)
      }
    />
  );

  const applyFilters = async () => {
    setState((state) => ({
      ...state,
      filters: { ...state.filtersDraft },
      filtersDraftApplied: true,
    }));
  };

  const transactionsFilters = (
    <div className="transactions-filters">
      <Space className="transactions-filters__space">
        <div className="transaction-filters__input">
          {transactionsDateFilter('start_date')}
        </div>
        <div className="transaction-filters__input">
          {transactionsDateFilter('end_date')}
        </div>
        <div className="transaction-filters__input">
          <Button
            type="primary"
            onClick={applyFilters}
            disabled={isLoading || state.filtersDraftApplied}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="white"
              style={{ margin: '0px 5px' }}
            />
            <span>{t('transaction.actions.filter')}</span>
          </Button>
        </div>
      </Space>
    </div>
  );

  /*
   * ui
   */

  if (error) showGenericOperationFailedMessage(error, t);

  return (
    <div className="transactions-list-component">
      {addTransactionsButton}
      {transactionsFilters}
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
            total: transactionsResponse?.meta?.count || 0,
            disabled: isLoading || isPreviousData,
          }}
          dataSource={transactionsResponse?.data || []}
          renderItem={(transaction) =>
            // this accountForId check is important as it covers the case when the account list is updated but the
            // transactions response list is not fully updated yet
            accountForId(transaction.account_id) && (
              <List.Item
                key={transaction.id}
                className="transactions-list__item"
              >
                <TransactionCard
                  key={`transaction_card_in_list_for_${transaction.id}`}
                  account={accountForId(transaction.account_id)!}
                  transaction={transaction}
                  editMode={editMode}
                  singleAccountMode={singleAccountMode}
                />
              </List.Item>
            )
          }
        />
      </div>
      {transactionFormModal}
    </div>
  );
};

export default TransactionsList;
