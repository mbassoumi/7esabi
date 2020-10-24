import { useMutation } from '@apollo/client';
import { Divider, Input, message, Modal, Select } from 'antd';
import { concat, find, isEmpty, pull } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GQL_ADD_ACCOUNT } from '../../graphql/gql/account/add';
import { GqlAddAccount } from '../../graphql/gql/account/types/GqlAddAccount';
import { GqlUpdateAccount } from '../../graphql/gql/account/types/GqlUpdateAccount';
import { GQL_UPDATE_ACCOUNT } from '../../graphql/gql/account/update';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { GqlFragmentAccountGroup } from '../../graphql/gql/client-schema/types/GqlFragmentAccountGroup';
import {
  AccountGroupInput,
  AccountInput,
  AccountPermissionInput,
  Currency,
} from '../../graphql/gql/globalTypes';
import './styles/accountForm.scss';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import {
  convertToAccountGroupInput,
  convertToAccountPermissionsInput,
} from '../../graphql/utils/typeHelpers';
import CurrencyIcon from '../shared/Currency';
import FormModalFooter from '../shared/FormModalFooter';
import AccountPermissionsForm from './AccountPermissionsForm';

interface AccountFormModalProps {
  onSave: (mutationInfo: any) => any;
  onCancel: () => any;
  updateMode?: boolean;
  allAccountGroups: GqlFragmentAccountGroup[];
  account?: GqlFragmentAccount;
  accountGroup?: GqlFragmentAccountGroup | null;
  disableAccountSelection?: boolean;
}

interface AccountFormModalState {
  accountInput: AccountInput;
  allAccountGroupInputs: AccountGroupInput[];
}

const AccountFormModal = ({
  onSave,
  onCancel,
  updateMode = false,
  allAccountGroups,
  account,
  accountGroup,
  disableAccountSelection = false,
}: AccountFormModalProps) => {
  const { t } = useTranslation();

  const [addAccountFn, addAccountMutationInfo] = useMutation<GqlAddAccount>(
    GQL_ADD_ACCOUNT
  );

  const [updateAccountFn, updateAccountMutationInfo] = useMutation<
    GqlUpdateAccount
  >(GQL_UPDATE_ACCOUNT);

  const [state, setState] = useState({
    accountInput: {
      accountGroup: {} as any,
      currency: Currency.USD,
      permissions: [],
    } as any,
    allAccountGroupInputs: [],
  } as AccountFormModalState);

  useEffect(() => {
    setState({
      accountInput: buildAccountInput(),
      allAccountGroupInputs: allAccountGroups.map((accountGroup) =>
        convertToAccountGroupInput(accountGroup)
      ),
    });
  }, [account, allAccountGroups]);

  /*
   * Helpers
   */
  const buildAccountInput = (): AccountInput => ({
    id: account?.id,
    name: account?.name || '',
    currency: account?.currency || Currency.USD,
    accountGroup: convertToAccountGroupInput(accountGroup),
    permissions:
      account?.permissions?.map((accountPermission) =>
        convertToAccountPermissionsInput(accountPermission)
      ) || [],
  });

  const isAccountInputValid = (accountInput: AccountInput) => {
    return (
      !isEmpty(accountInput) &&
      !isEmpty(accountInput.name) &&
      !isEmpty(accountInput.currency) &&
      !isEmpty(accountInput.accountGroup)
    );
  };

  /*
   * Actions and event handlers
   */
  const onAccountAttributeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setState((state: any) => ({
      ...state,
      accountInput: { ...state.accountInput, [fieldName]: fieldValue },
    }));
  };

  const onAccountGroupSelectChange = (groupId: string) => {
    const selectedAccountGroup =
      find(state.allAccountGroupInputs, {
        id: groupId,
      }) || {};
    setState((state: any) => ({
      ...state,
      accountInput: {
        ...state.accountInput,
        accountGroup: selectedAccountGroup,
      },
    }));
  };

  const onCurrencySelectChange = (selectValue: string) => {
    setState((state: any) => ({
      ...state,
      accountInput: {
        ...state.accountInput,
        currency: (Currency as any)[selectValue],
      },
    }));
  };

  const updateAccountPermissionInput = (
    userId: string,
    updatedAccountPermissionInput: AccountPermissionInput | null
  ) => {
    const accountPermissionInputs = concat(
      state.accountInput.permissions,
      []
    )! as AccountPermissionInput[];
    const oldAccountPermissionInput = find(accountPermissionInputs, {
      userId,
    });

    if (oldAccountPermissionInput) {
      if (updatedAccountPermissionInput) {
        // it's an update
        oldAccountPermissionInput.canEdit =
          updatedAccountPermissionInput.canEdit;
      } else {
        /// it's a new user
        pull(accountPermissionInputs, oldAccountPermissionInput);
      }
    } else {
      // it's a removed user
      accountPermissionInputs.push({
        userId,
        canEdit: updatedAccountPermissionInput!.canEdit,
      });
    }

    setState((state) => ({
      ...state,
      accountInput: {
        ...state.accountInput,
        permissions: accountPermissionInputs || [],
      },
    }));
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode ? updateAccountFn : addAccountFn;
    try {
      await saveFn({
        variables: { data: state.accountInput },
      });

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      const mutationInfo = updateMode
        ? updateAccountMutationInfo.loading
        : addAccountMutationInfo.loading;
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
  const accountGroupSelector = () => (
    <Select
      showSearch
      allowClear
      size="large"
      className="account-form__input__select"
      placeholder={t('account.form.selectGroupName')}
      disabled={disableAccountSelection}
      value={`${state.accountInput.accountGroup.name}`}
      onSelect={onAccountGroupSelectChange}
      filterOption={(input, option) =>
        option?.children?.toLowerCase().indexOf(input) > 0
      }
    >
      {state.allAccountGroupInputs?.map((accountGroupInput, index) => (
        <Select.Option
          key={`all_groups_select_${accountGroupInput.id}`}
          value={accountGroupInput.id!}
        >
          {accountGroupInput.name}
        </Select.Option>
      ))}
    </Select>
  );

  const currencySelector = () => (
    <Select
      size="large"
      className="account-form__input__select"
      value={state.accountInput.currency}
      onChange={onCurrencySelectChange}
      placeholder={t('account.form.selectCurrency')}
    >
      {Object.keys(Currency).map((key: string) => (
        <Select.Option key={key} value={key}>
          <span className="">
            <CurrencyIcon currencyType={key as Currency} />
          </span>
          <span className="account-form__input__select__option">
            {t(`account.currency.${key}`)}
          </span>
        </Select.Option>
      ))}
    </Select>
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
              ? updateAccountMutationInfo.loading
              : addAccountMutationInfo.loading
          }
          disabled={!isAccountInputValid(state.accountInput)}
        />
      }
    >
      <div className="account-form__input__container">
        <div className="account-form__input">{accountGroupSelector()}</div>
        <div className="account-form__input">{currencySelector()}</div>
        <div className="account-form__input">
          <Input
            name="name"
            value={state.accountInput.name}
            onChange={onAccountAttributeChange}
            size="large"
            placeholder={t('account.form.inputAccountName')}
          />
        </div>
        <Divider>{t('account.form.permissionsSectionHeader')}</Divider>
        <div className="account-form__input">
          <AccountPermissionsForm
            accountPermissions={state.accountInput.permissions!}
            updateAccountPermission={updateAccountPermissionInput}
            editMode
          />
        </div>
      </div>
    </Modal>
  );
};

export default AccountFormModal;
