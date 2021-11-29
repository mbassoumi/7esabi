import { ExclamationCircleOutlined } from '@ant-design/icons';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import CurrencyIcon from '../shared/Currency';
import { EntityActionButtons } from '../shared/EntityActionButtons';
import './styles/transactionCard.scss';
import { AccountTransaction } from '../../@types/AccountTransaction';
import { Account } from '../../@types/Account';
import {
  getCachedCurrentUser,
  getCachedUserInfo,
  refreshAccount,
} from '../helpers/storeHelper';
import { isEmpty } from 'lodash';
import {
  accountFullName,
  convertApiDateStringToDisplayString,
  userFullName,
} from '../../utils/helpers';
import { AccountTransactionType } from '../../@types/enums';
import TransactionFormModal from './TransactionFormModal';
import { useMutation } from 'react-query';
import { deleteTransactionApi } from '../../api/accountTransactions';

interface TransactionCardProps {
  transaction: AccountTransaction;
  account: Account;
  editMode: boolean;
  singleAccountMode?: boolean;
}

interface TransactionCardState {
  transactionFormModalVisible: boolean;
}

const TransactionCard = ({
  transaction,
  account,
  editMode,
  singleAccountMode,
}: TransactionCardProps) => {
  const { t, i18n } = useTranslation();
  const currentUser = getCachedCurrentUser()!;
  const transactionUser = getCachedUserInfo(transaction.user_id)!;
  const isTransactionForCurrentUser = currentUser.id === transaction.user_id;
  const isAccountSharedWithOthers = !isEmpty(account.permissions);

  const deleteAccountTransactionMutation = useMutation(async () =>
    deleteTransactionApi(transaction.id, account.id)
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

  const onSaveTransaction = async (mutationInfo: any) => {
    await refreshAccount(account.id);
    closeModals();
  };

  const transactionFormModal = state.transactionFormModalVisible && (
    <TransactionFormModal
      onSave={onSaveTransaction}
      onCancel={closeModals}
      account={account}
      transaction={transaction}
    />
  );

  const openTransactionFormModal = (transaction: AccountTransaction) => {
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
      const data = await deleteAccountTransactionMutation.mutateAsync();

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      await refreshAccount(account.id);
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {},
    });
  };

  /*
   * Action buttons
   */
  const transactionActionButtons = () => {
    if (!editMode) return <></>;

    return (
      <EntityActionButtons
        ownerEntity={transaction}
        translationIndex="transaction"
        onEditButton={openTransactionFormModal}
        onDeleteButton={openDeleteTransactionModal}
      />
    );
  };

  /*
   * UI parts
   */

  const dateInfoLine = () => {
    const dateString = convertApiDateStringToDisplayString(transaction.date);
    if (isAccountSharedWithOthers) {
      const userName = isTransactionForCurrentUser
        ? t('user.you')
        : userFullName(transactionUser);
      return `${dateString}, ${userName}`;
    } else {
      return dateString;
    }
  };
  const actionType =
    transaction.transaction_type === AccountTransactionType.CREDIT ? (
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
      <div className="transaction-card__container">
        <div
          className={`account-card__entity-control-buttons ${entityControlButtonsRtlClass}`}
        >
          {transactionActionButtons()}
        </div>
        {!singleAccountMode && (
          <div className="transaction-card__line">
            <span>{`${t('generic.entities.account')}: ${accountFullName(
              account
            )}`}</span>
          </div>
        )}
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
      {transactionFormModal}
    </>
  );
};

export default TransactionCard;
