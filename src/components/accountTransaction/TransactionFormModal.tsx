import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, InputNumber, message, Modal, Space, Switch } from 'antd';
import { isEmpty } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';
import './styles/transactionFormModal.scss';
import { Account } from '../../@types/Account';
import { AccountTransaction } from '../../@types/AccountTransaction';
import {
  AccountTransactionParams,
  createTransactionApi,
  updateTransactionApi,
} from '../../api/accountTransactions';
import { AccountTransactionType } from '../../@types/enums';
import { useMutation } from 'react-query';
import DatePicker from '../shared/DatePicker';
import {
  convertApiDateStringToDate,
  convertDateToApiDateString,
} from '../../utils/helpers';

interface TransactionFormModalProps {
  onSave: (mutationInfo: any) => any;
  onCancel: () => any;
  account: Account;
  transaction?: AccountTransaction;
}

interface TransactionFormModalState {
  transactionParams: AccountTransactionParams;
}

const TransactionFormModal = ({
  onSave,
  onCancel,
  account,
  transaction,
}: TransactionFormModalProps) => {
  const { t } = useTranslation();
  const updateMode = !isEmpty(transaction);

  const createAccountTransactionMutation = useMutation(
    (state: TransactionFormModalState) =>
      createTransactionApi(account.id, state.transactionParams)
  );

  const updateAccountTransactionMutation = useMutation(
    async (state: TransactionFormModalState) =>
      updateTransactionApi(transaction!.id, account.id, state.transactionParams)
  );

  const [state, setState] = useState<TransactionFormModalState>({
    transactionParams: {
      transaction_type: updateMode
        ? transaction!.transaction_type
        : AccountTransactionType.CREDIT,
      amount: updateMode ? transaction!.amount : (undefined as any),
      description: updateMode ? transaction!.description : '',
      date: updateMode
        ? transaction!.date
        : convertDateToApiDateString(new Date()),
    },
  });

  /*
   * Helpers
   */
  const isTransactionInputValid = (
    transactionParams: AccountTransactionParams
  ) => {
    return (
      !isEmpty(transactionParams) &&
      !isEmpty(transactionParams.transaction_type) &&
      transactionParams.amount > 0
    );
  };

  /*
   * Actions and event handlers
   */
  const onTransactionAmountChange = (amount: number) => {
    setState((state: any) => ({
      ...state,
      transactionParams: { ...state.transactionParams, amount },
    }));
  };

  const onTransactionAttributeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setState((state: any) => ({
      ...state,
      transactionParams: {
        ...state.transactionParams,
        [fieldName]: fieldValue,
      },
    }));
  };

  const onTransactionTypeChange = (creditTypeChecked: boolean) => {
    const transactionType = creditTypeChecked
      ? AccountTransactionType.CREDIT
      : AccountTransactionType.DEBIT;
    setState({
      ...state,
      transactionParams: {
        ...state.transactionParams,
        transaction_type: transactionType,
      },
    });
  };

  const onTransactionDateChange = (
    selectedDate: Date | null,
    dateString: string | null
  ) => {
    const date = selectedDate || new Date();
    setState({
      ...state,
      transactionParams: {
        ...state.transactionParams,
        date: convertDateToApiDateString(date),
      },
    });
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode
      ? updateAccountTransactionMutation
      : createAccountTransactionMutation;
    try {
      const mutationResponse = await saveFn.mutateAsync(state);

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      await onSave(mutationResponse);
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

  /*
   * UI parts
   */

  const transactionTypeSwitch = (
    <Switch
      className="transaction-form__input__transaction_type"
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
      checked={
        state.transactionParams.transaction_type ===
        AccountTransactionType.CREDIT
      }
    />
  );

  return (
    <Modal
      visible={true}
      maskClosable={false}
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
              ? updateAccountTransactionMutation.isLoading
              : createAccountTransactionMutation.isLoading
          }
          disabled={!isTransactionInputValid(state.transactionParams)}
        />
      }
    >
      <div className="transaction-form__container" id="transaction_modal">
        <div className="transaction-form__input__container">
          <div className="transaction-form__input">
            <Space className="transaction-form__input__amount_row_space">
              <InputNumber
                className="transaction-form__input__amount"
                name="amount"
                value={state.transactionParams.amount}
                onChange={onTransactionAmountChange}
                min={0}
                step={0.1}
                placeholder={t('transaction.form.inputAmount')}
              />
              {transactionTypeSwitch}
            </Space>
          </div>

          <div className="transaction-form__input">
            <Input
              name="description"
              value={state.transactionParams.description || ''}
              onChange={onTransactionAttributeChange}
              size="large"
              placeholder={t('transaction.form.inputDescription')}
            />
          </div>

          <div className="transaction-form__input">
            <DatePicker
              allowClear={false}
              className="transaction-form__input__date"
              defaultValue={convertApiDateStringToDate(
                state.transactionParams.date
              )}
              format="YYYY/MM/D" // otherwise it would keep adding a zero right after the user enter the first days digit
              name={'date'}
              placeholder={t('transaction.form.selectDate')}
              onChange={onTransactionDateChange}
              getPopupContainer={() =>
                document.getElementById('transaction_modal') as any
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionFormModal;
