import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';
import { Account } from '../../@types/Account';
import { useMutation } from 'react-query';
import { deleteAccountApi } from '../../api/account';
import { accountFullName } from '../../utils/helpers';

interface DeleteAccountModalProps {
  account: Account;
  onDelete: (mutationInfo: any) => any;
  onCancel: (event: any) => any;
}

const DeleteAccountModal = ({
  account,
  onDelete,
  onCancel,
}: DeleteAccountModalProps) => {
  const { t } = useTranslation();

  const deleteAccountMutation = useMutation(async () =>
    deleteAccountApi(account.id, account.account_group.id)
  );

  const onDeleteClick = async (event: any) => {
    event.stopPropagation();

    try {
      const data = await deleteAccountMutation.mutateAsync();

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      await onDelete(data);
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
    onCancel(event);
  };

  return (
    <Modal
      visible={true}
      title={
        <span>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color="red"
            style={{ marginLeft: '3px', marginRight: '3px', fontSize: '20px' }}
          />
          {`${t('account.deleteForm.title')} : ${accountFullName(account)}`}
        </span>
      }
      onCancel={onCancelClick}
      footer={
        <FormModalFooter
          onSaveOrDeleteClick={onDeleteClick}
          onCancelClick={onCancelClick}
          loading={deleteAccountMutation.isLoading}
          disabled={false}
          isForDelete={true}
        />
      }
    >
      {t('account.deleteForm.body')}
    </Modal>
  );
};

export default DeleteAccountModal;
