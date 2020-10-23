import { useMutation } from '@apollo/client';
import { Input, message, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GQL_ADD_ACCOUNT_GROUP } from '../../graphql/gql/accountGroup/add';
import { GqlAddAccountGroup } from '../../graphql/gql/accountGroup/types/GqlAddAccountGroup';
import { GqlUpdateAccountGroup } from '../../graphql/gql/accountGroup/types/GqlUpdateAccountGroup';
import { GQL_UPDATE_ACCOUNT_GROUP } from '../../graphql/gql/accountGroup/update';
import { GqlFragmentAccountGroup } from '../../graphql/gql/client-schema/types/GqlFragmentAccountGroup';
import { AccountGroupInput } from '../../graphql/gql/globalTypes';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import { convertToAccountGroupInput } from '../../graphql/utils/typeHelpers';
import FormModalFooter from '../shared/FormModalFooter';

interface AccountGroupModalState {
  accountGroupInput: AccountGroupInput;
}

interface AccountGroupModalProps {
  onSave: (mutationInfo: any) => any;
  onCancel: () => any;
  updateMode?: boolean;
  accountGroup?: GqlFragmentAccountGroup | null;
}

const AccountGroupFormModal = ({
  onSave,
  onCancel,
  updateMode = false,
  accountGroup = null,
}: AccountGroupModalProps) => {
  const { t } = useTranslation();

  const [addAccountGroupFn, addAccountGroupMutationInfo] = useMutation<
    GqlAddAccountGroup
  >(GQL_ADD_ACCOUNT_GROUP);

  const [updateAccountGroupFn, updateAccountGroupMutationInfo] = useMutation<
    GqlUpdateAccountGroup
  >(GQL_UPDATE_ACCOUNT_GROUP);

  const [state, setState] = useState({
    accountGroupInput: {},
  } as AccountGroupModalState);

  useEffect(() => {
    setState({
      accountGroupInput: convertToAccountGroupInput(accountGroup),
    });
  }, [accountGroup]);

  /*
   * Actions and events handlers
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setState((state: any) => ({
      accountGroupInput: { ...state.accountGroupInput, name },
    }));
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode ? updateAccountGroupFn : addAccountGroupFn;
    try {
      await saveFn({
        variables: { data: state.accountGroupInput },
      });

      message.success(
        t(`messages.accountGroup.saved`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      const mutationInfo = updateMode
        ? updateAccountGroupMutationInfo.loading
        : addAccountGroupMutationInfo.loading;
      onSave(mutationInfo);
    } catch (error) {
      console.log('error', error);
      message.error(
        t(`messages.accountGroup.savingFailed`),
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
   * Ui parts
   */
  return (
    <Modal
      visible={true}
      title={
        updateMode
          ? t('accountGroup.form.title.edit')
          : t('accountGroup.form.title.create')
      }
      onCancel={onCancelClick}
      footer={
        <FormModalFooter
          onSaveOrDeleteClick={onSaveClick}
          onCancelClick={onCancelClick}
          loading={
            updateMode
              ? updateAccountGroupMutationInfo.loading
              : addAccountGroupMutationInfo.loading
          }
          disabled={isEmpty(state.accountGroupInput.name)}
        />
      }
    >
      <Input
        value={state.accountGroupInput.name}
        onChange={onChange}
        size="large"
        placeholder={t('accountGroup.form.inputAccountGroupName')}
      />
    </Modal>
  );
};

export default AccountGroupFormModal;
