import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { GqlFragmentTransaction } from '../../graphql/gql/client-schema/types/GqlFragmentTransaction';
import { TransactionType } from '../../graphql/gql/globalTypes';
import { GQL_DELETE_TRANSACTION } from '../../graphql/gql/transaction/delete';
import { GQL_TRANSACTIONS_PAGINATED } from '../../graphql/gql/transaction/getPaginated';
import { GqlDeleteTransaction } from '../../graphql/gql/transaction/types/GqlDeleteTransaction';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import { useBasicUserInfo, useCurrentUser } from '../helpers/storeHelper';
import CurrencyIcon from '../shared/Currency';
import { EntityActionButtons } from '../shared/EntityActionButtons';
import './styles/transactionCard.scss';
import TransactionFormModal from './TransactionFormModal';

interface TransactionCardProps {
  transaction: GqlFragmentTransaction;
  account: GqlFragmentAccount;
  refreshTransactionsPaginationArgs: {
    skip: number;
    take?: number;
  };
}

interface TransactionCardState {
  transactionFormModalVisible: boolean;
}

const TransactionCard = ({
  transaction,
  account,
  refreshTransactionsPaginationArgs,
}: TransactionCardProps) => {
  const { t, i18n } = useTranslation();
  const currentUser = useCurrentUser()!;
  const transactionUser = useBasicUserInfo(transaction.user.id)!;
  const isTransactionForCurrentUser = currentUser.id === transaction.user.id;

  const [deleteTransactionFn] = useMutation<GqlDeleteTransaction>(
    GQL_DELETE_TRANSACTION,
    {
      refetchQueries: [
        {
          query: GQL_TRANSACTIONS_PAGINATED,
          variables: {
            accountId: account!.id,
            ...refreshTransactionsPaginationArgs,
          },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const [state, setState] = useState({
    transactionFormModalVisible: false,
  } as TransactionCardState);

  const closeModals = () => {
    setState({} as any);
  };

  /*
   * Update Transaction Modal
   */

  const onSaveTransaction = (mutationInfo: any) => {
    closeModals();
  };

  const transactionFormModal = state.transactionFormModalVisible && (
    <TransactionFormModal
      onSave={onSaveTransaction}
      onCancel={closeModals}
      account={account}
      transaction={transaction}
      updateMode
      refreshTransactionsPaginationArgs={refreshTransactionsPaginationArgs}
    />
  );

  const openTransactionFormModal = (transaction: GqlFragmentTransaction) => {
    setState((state) => ({
      ...state,
      transactionFormModalVisible: true,
    }));
  };

  /*
   * Delete Transaction Modal
   */

  const onDeleteTransaction = async () => {
    try {
      await deleteTransactionFn({
        variables: { id: transaction.id },
      });

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );
    } catch (error) {
      console.log('error', error);
      message.error(
        t(`generic.errors.operationFailed`),
        DEFAULT_ERROR_MESSAGE_DURATION
      );
    }
  };

  const openDeleteTransactionModal = () => {
    Modal.confirm({
      title: t('transaction.deleteForm.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('transaction.deleteForm.body'),
      okText: t('generic.actions.yes'),
      okType: 'danger',
      cancelText: t('generic.actions.no'),
      onOk: onDeleteTransaction,
      onCancel() {},
    });
  };

  /*
   * Action buttons
   */
  const transactionActionButtons = isTransactionForCurrentUser ? (
    <EntityActionButtons
      ownerEntity={transaction}
      translationIndex="transaction"
      onEditButton={openTransactionFormModal}
      onDeleteButton={openDeleteTransactionModal}
    />
  ) : (
    <></>
  );

  /*
   * UI parts
   */

  const dateInfoLine = () => {
    const dateString = new Date(transaction.date).toLocaleDateString();
    if (account.isShared) {
      const userName = isTransactionForCurrentUser
        ? t('user.you')
        : transactionUser.fullName;
      return `${dateString}, ${userName}`;
    } else {
      return dateString;
    }
  };
  const actionType =
    transaction.type === TransactionType.CREDIT ? (
      <span style={{ color: 'green' }}>
        <FontAwesomeIcon icon={faPlusCircle} />{' '}
        {t('transaction.operation.deposit')}
      </span>
    ) : (
      <span style={{ color: 'red' }}>
        <FontAwesomeIcon icon={faMinusCircle} color="red" />{' '}
        {t('transaction.operation.withdraw')}{' '}
      </span>
    );

  const entityControlButtonsRtlClass: any =
    i18n.dir() === 'rtl' ? 'account-card__entity-control-buttons__rtl' : '';

  return (
    <>
      {transactionFormModal}
      <div className="transaction-card__container">
        <div
          className={`account-card__entity-control-buttons ${entityControlButtonsRtlClass}`}
        >
          {transactionActionButtons}
        </div>

        <div className="transaction-card__line">
          <div className="transaction-card__action-type">{actionType}</div>
          <div className="transaction-card__amount">
            <span>
              <CurrencyIcon currencyType={account.currency} />
            </span>
            <span className="transaction-card__amount__value">
              {Number(transaction.amount || 0).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="transaction-card__line">
          <div className="transaction-card__date-info">{dateInfoLine()}</div>
        </div>
        <div className="transaction-card__line">
          <div className="transaction-card__description">
            {transaction.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
