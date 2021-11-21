import { Divider, Input, message, Modal } from 'antd';
import { isEmpty, remove } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';
import './styles/accountForm.scss';
import { AccountGroup } from '../../@types/AccountGroup';
import { Account } from '../../@types/Account';
import { useMutation } from 'react-query';
import {
  AccountParams,
  AccountPermissionParams,
  createAccountApi,
  updateAccountApi,
} from '../../api/account';
import { Currency } from '../../@types/enums';
import CurrencySelector from '../shared/CurrencySelector';
import AccountPermissionsForm from './AccountPermissionsForm';
import { initAccountParams } from '../../utils/helpers';

interface AccountFormModalProps {
  accountGroup: AccountGroup;
  onSave: (mutationInfo: any) => any;
  onCancel: () => any;
  account?: Account;
}

interface AccountFormModalState {
  accountParams: AccountParams;
}

const AccountFormModal = ({
  accountGroup,
  onSave,
  onCancel,
  account,
}: AccountFormModalProps) => {
  const { t } = useTranslation();
  const updateMode = !isEmpty(account);

  const createAccountMutation = useMutation((state: AccountFormModalState) =>
    createAccountApi(accountGroup.id, state.accountParams)
  );

  const updateAccountMutation = useMutation(
    async (state: AccountFormModalState) =>
      updateAccountApi(account!.id, accountGroup.id, state.accountParams)
  );

  const [state, setState] = useState<AccountFormModalState>({
    accountParams: initAccountParams(),
  });

  useEffect(() => {
    if (account) {
      setState({ accountParams: initAccountParams(account) });
    }
  }, [account]);

  /*
   * Helpers
   */
  const isAccountInputValid = (accountInput: AccountParams) => {
    return (
      accountInput &&
      !isEmpty(accountInput) &&
      !isEmpty(accountInput.name) &&
      !isEmpty(accountInput.currency)
    );
  };

  /*
   * Actions and event handlers
   */
  const onAccountInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setState((state) => ({
      ...state,
      accountParams: {
        ...state.accountParams,
        [fieldName]: fieldValue,
      } as AccountParams,
    }));
  };

  const onCurrencySelectChange = (selectValue: string) => {
    setState((state) => ({
      ...state,
      accountParams: {
        ...state.accountParams,
        currency: (Currency as any)[selectValue],
      } as AccountParams,
    }));
  };

  const createOrDeletePermission = (
    accountPermissionParams: AccountPermissionParams,
    deleted?: boolean
  ) => {
    setState((state) => {
      const newState = { ...state };

      if (deleted) {
        // removed permission
        remove(
          newState.accountParams.permissions,
          (permissionParams) =>
            permissionParams.user_id === accountPermissionParams.user_id
        );
      } else {
        // new permission
        newState.accountParams.permissions.push(accountPermissionParams);
      }
      console.log(`new stateee`, newState);
      return newState;
    });
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode ? updateAccountMutation : createAccountMutation;
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
  const accountGroupInput = () => (
    <Input name="name" value={accountGroup.name} disabled={true} size="large" />
  );

  const currencySelector = () => (
    <CurrencySelector
      selectedCurrency={state.accountParams!.currency}
      onCurrencySelectChange={onCurrencySelectChange}
    />
  );

  return (
    <Modal
      visible={true}
      maskClosable={false}
      className={'rtl'}
      title={
        updateMode
          ? t('account.form.title.edit')
          : t('account.form.title.create')
      }
      onCancel={onCancelClick}
      footer={
        <FormModalFooter
          onSaveOrDeleteClick={onSaveClick}
          onCancelClick={onCancelClick}
          loading={
            updateMode
              ? updateAccountMutation.isLoading
              : createAccountMutation.isLoading
          }
          disabled={!isAccountInputValid(state?.accountParams)}
        />
      }
    >
      <div className="account-form__input__container">
        <div className="account-form__input">{accountGroupInput()}</div>
        <div className="account-form__input">
          <Input
            name="name"
            value={state.accountParams.name}
            onChange={onAccountInputChange}
            size="large"
            placeholder={t('account.form.inputAccountName')}
          />
        </div>
        <div className="account-form__input">{currencySelector()}</div>
        <Divider>{t('account.form.permissionsSectionHeader')}</Divider>
        <div className="account-form__input">
          <AccountPermissionsForm
            accountPermissionParamsList={state.accountParams.permissions}
            createOrDeletePermission={createOrDeletePermission}
            editMode
          />
        </div>
      </div>
    </Modal>
  );
};

export default AccountFormModal;
