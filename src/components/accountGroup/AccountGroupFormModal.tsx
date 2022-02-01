import { Alert, Checkbox, Input, message, Modal } from 'antd';
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
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { initAccountGroupParams } from '../../utils/helpers';

interface AccountGroupModalState {
  accountGroupParams: AccountGroupParams;
}

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

  const [state, setState] = useState<AccountGroupModalState>({
    accountGroupParams: initAccountGroupParams(),
  });

  useEffect(() => {
    if (updateMode) {
      setState({ accountGroupParams: initAccountGroupParams(accountGroup!) });
    }
  }, []);

  /*
   * Actions and events handlers
   */

  const onParamChanged = (fieldName: string, fieldValue: string | boolean) =>
    setState((state) => ({
      ...state,
      accountGroupParams: {
        ...state?.accountGroupParams,
        [fieldName]: fieldValue,
      } as AccountGroupParams,
    }));

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    onParamChanged(fieldName, fieldValue);
  };

  const onSaveClick = async (event: any) => {
    event.stopPropagation();

    const saveFn = updateMode
      ? updateAccountGroupMutation
      : createAccountGroupMutation;
    try {
      const mutationResponse = await saveFn.mutateAsync({
        ...state!.accountGroupParams!,
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

  const onArchivedChange = (e: CheckboxChangeEvent) =>
    onParamChanged('archived', e.target.checked);

  const archivedInput = () => (
    <Checkbox
      checked={state?.accountGroupParams!.archived}
      onChange={onArchivedChange}
    >
      {t('accountGroup.form.inputAccountGroupArchived')}
    </Checkbox>
  );

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
          disabled={isEmpty(state?.accountGroupParams.name)}
        />
      }
    >
      <Input
        name="name"
        value={state?.accountGroupParams.name}
        onChange={onInputChange}
        size="large"
        placeholder={t('accountGroup.form.inputAccountGroupName')}
      />
      {updateMode && <div>{archivedInput()}</div>}
      {state?.accountGroupParams.archived && (
        <Alert
          message={t('accountGroup.form.archivedWarning.title')}
          description={t('accountGroup.form.archivedWarning.body')}
          type="warning"
          showIcon
          style={{ marginBottom: '5px' }}
        />
      )}
    </Modal>
  );
};

export default AccountGroupFormModal;
