import { useMutation } from '@apollo/client';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Input, message, Modal, Space, Switch } from 'antd';
import { isEmpty } from 'lodash';
import moment, { Moment } from 'moment';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { GqlFragmentTransaction } from '../../graphql/gql/client-schema/types/GqlFragmentTransaction';
import {
  TransactionInput,
  TransactionType,
} from '../../graphql/gql/globalTypes';
import { GQL_ADD_TRANSACTION } from '../../graphql/gql/transaction/add';
import { GQL_TRANSACTIONS_PAGINATED } from '../../graphql/gql/transaction/getPaginated';
import { GqlAddTransaction } from '../../graphql/gql/transaction/types/GqlAddTransaction';
import { GqlUpdateTransaction } from '../../graphql/gql/transaction/types/GqlUpdateTransaction';
import { GQL_UPDATE_TRANSACTION } from '../../graphql/gql/transaction/update';
import './styles/transactionFormModal.scss';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';

interface TransactionFormModalProps {
  onSave: (mutationInfo: any) => any;
  onCancel: () => any;
  updateMode?: boolean;
  account: GqlFragmentAccount;
  transaction?: GqlFragmentTransaction;
  refreshTransactionsPaginationArgs?: {
    skip: number;
    take?: number;
  };
}

interface TransactionFormModalState {
  transactionInput: TransactionInput;
}

const TransactionFormModal = ({
  onSave,
  onCancel,
  updateMode = false,
  account,
  transaction,
  refreshTransactionsPaginationArgs = { skip: 0 },
}: TransactionFormModalProps) => {
  const { t } = useTranslation();

  const [addTransactionFn, addTransactionMutationInfo] = useMutation<
    GqlAddTransaction
  >(GQL_ADD_TRANSACTION, {
    refetchQueries: [
      {
        query: GQL_TRANSACTIONS_PAGINATED,
        variables: {
          accountId: account.id,
          ...refreshTransactionsPaginationArgs,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [updateTransactionFn, updateTransactionMutationInfo] = useMutation<
    GqlUpdateTransaction
  >(GQL_UPDATE_TRANSACTION, {
    refetchQueries: [
      {
        query: GQL_TRANSACTIONS_PAGINATED,
        variables: {
          accountId: account.id,
          ...refreshTransactionsPaginationArgs,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [state, setState] = useState({
    transactionInput: {
      accountId: account!.id,
      id: updateMode ? transaction!.id : null,
      type: updateMode ? transaction!.type : TransactionType.CREDIT,
      amount: updateMode ? transaction!.amount : 0,
      date: updateMode ? transaction!.date : new Date().getTime(),
      description: updateMode ? transaction!.description : '',
    },
  } as TransactionFormModalState);

  /*
   * Helpers
   */
  const isTransactionInputValid = (transactionInput: TransactionInput) => {
    return (
      !isEmpty(transactionInput) &&
      !isEmpty(transactionInput.type) &&
      transactionInput.amount > 0
    );
  };

  /*
   * Actions and event handlers
   */
  const onTransactionAttributeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    let fieldValue: string | number | null;
    if (fieldName === 'amount') {
      fieldValue = e.target.value ? parseInt(e.target.value) : null;
    } else {
      fieldValue = e.target.value;
    }
    setState((state: any) => ({
      ...state,
      transactionInput: { ...state.transactionInput, [fieldName]: fieldValue },
    }));
  };

  const onTransactionTypeChange = (creditTypeChecked: boolean) => {
    const transactionType = creditTypeChecked
      ? TransactionType.CREDIT
      : TransactionType.DEBIT;
    setState({
      ...state,
      transactionInput: { ...state.transactionInput, type: transactionType },
    });
  };

  const onTransactionDateChange = (
    date: Moment | null,
    dateString: string | null
  ) => {
    const dateValue = isEmpty(dateString) ? new Date() : new Date(dateString!);
    setState({
      ...state,
      transactionInput: {
        ...state.transactionInput,
        date: dateValue.getTime(),
      },
    });
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode ? updateTransactionFn : addTransactionFn;
    try {
      await saveFn({
        variables: { data: state.transactionInput },
      });

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      const mutationInfo = updateMode
        ? updateTransactionMutationInfo.loading
        : addTransactionMutationInfo.loading;
      onSave(mutationInfo);
    } catch (error) {
      console.log('error', error);
      message.error(
        t(`generic.errors.operationFailed`),
        DEFAULT_ERROR_MESSAGE_DURATION
      );
    }
  };

  const onCancelClick = (event: any) => {
    event.stopPropagation();
    onCancel();
  };

  console.log('rendeeeer');

  /*
   * UI parts
   */

  const transactionTypeSwitch = (
    <Switch
      onChange={onTransactionTypeChange}
      checkedChildren={
        <span>
          {' '}
          <FontAwesomeIcon icon={faPlusCircle} />
          {t('transaction.operation.deposit')}
        </span>
      }
      unCheckedChildren={
        <span>
          <FontAwesomeIcon icon={faMinusCircle} color="red" />
          {t('transaction.operation.withdraw')}
        </span>
      }
      checked={state.transactionInput.type === TransactionType.CREDIT}
    />
  );

  return (
    <Modal
      visible={true}
      title={
        updateMode
          ? t('transaction.form.title.edit')
          : t('transaction.form.title.create')
      }
      onCancel={onCancelClick}
      footer={
        <FormModalFooter
          onSaveOrDeleteClick={onSaveClick}
          onCancelClick={onCancelClick}
          loading={
            updateMode
              ? updateTransactionMutationInfo.loading
              : addTransactionMutationInfo.loading
          }
          disabled={!isTransactionInputValid(state.transactionInput)}
        />
      }
    >
      <div className="transaction-form__container">
        <div className="transaction-form__input__container">
          <div className="transaction-form__input">
            <Space>
              <Input
                type="number"
                name="amount"
                value={state.transactionInput.amount}
                onChange={onTransactionAttributeChange}
                size="middle"
                min={0}
                placeholder={t('transaction.form.inputAmount')}
              />
              {transactionTypeSwitch}
            </Space>
          </div>

          <div className="transaction-form__input">
            <Input
              name="description"
              value={state.transactionInput.description || ''}
              onChange={onTransactionAttributeChange}
              size="large"
              placeholder={t('transaction.form.inputDescription')}
            />
          </div>

          <div className="transaction-form__input">
            <DatePicker
              allowClear={false}
              className="transaction-form__input__date"
              defaultValue={moment()}
              format="YYYY/MM/DD"
              name={'date'}
              placeholder={t('transaction.form.selectDate')}
              onChange={onTransactionDateChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionFormModal;
