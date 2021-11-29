import { Input, message, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';
import { AccountGroup } from '../../@types/AccountGroup';
import { useMutation } from 'react-query';
import {
  AccountGroupParams,
  createAccountGroupApi,
  updateAccountGroupApi,
} from '../../api/accountGroup';

type AccountGroupModalState = AccountGroupParams | undefined;

interface AccountGroupModalProps {
  onSave: (mutationInfo: any) => any;
  onCancel: () => any;
  accountGroup?: AccountGroup | null;
}

const AccountGroupFormModal = ({
  onSave,
  onCancel,
  accountGroup,
}: AccountGroupModalProps) => {
  const { t } = useTranslation();
  const updateMode = !isEmpty(accountGroup);

  const createAccountGroupMutation = useMutation(createAccountGroupApi);

  const updateAccountGroupMutation = useMutation(
    async (accountGroupParams: AccountGroupParams) =>
      updateAccountGroupApi(accountGroup!.id, accountGroupParams)
  );

  const [state, setState] = useState<AccountGroupModalState>();

  useEffect(() => {
    if (updateMode) {
      setState({ name: accountGroup!.name });
    }
  }, []);

  /*
   * Actions and events handlers
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setState((state: AccountGroupModalState) => ({
      ...state,
      name,
    }));
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode
      ? updateAccountGroupMutation
      : createAccountGroupMutation;
    try {
      const mutationResponse = await saveFn.mutateAsync({
        ...state!,
      });

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
   * Ui parts
   */
  return (
    <Modal
      visible={true}
      maskClosable={false}
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
              ? updateAccountGroupMutation.isLoading
              : createAccountGroupMutation.isLoading
          }
          disabled={isEmpty(state?.name)}
        />
      }
    >
      <Input
        value={state?.name}
        onChange={onChange}
        size="large"
        placeholder={t('accountGroup.form.inputAccountGroupName')}
      />
    </Modal>
  );
};

export default AccountGroupFormModal;
