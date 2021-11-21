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
import { AccountGroup } from '../../@types/AccountGroup';
import { deleteAccountGroupApi } from '../../api/accountGroup';
import { useMutation } from 'react-query';

interface DeleteGroupModalProps {
  accountGroup: AccountGroup;
  onDelete: () => any;
  onCancel: (event: any) => any;
}

const DeleteGroupModal = ({
  accountGroup,
  onDelete,
  onCancel,
}: DeleteGroupModalProps) => {
  const { t } = useTranslation();

  const deleteAccountGroupMutation = useMutation(async () =>
    deleteAccountGroupApi(accountGroup.id)
  );

  const onDeleteClick = async (event: any) => {
    event.stopPropagation();

    try {
      const mutationResponse = await deleteAccountGroupMutation.mutateAsync();

      message.success(
        t(`generic.messages.success`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      await onDelete();
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
          {`${t('accountGroup.deleteForm.title')} : ${accountGroup.name}`}
        </span>
      }
      onCancel={onCancelClick}
      footer={
        <FormModalFooter
          onSaveOrDeleteClick={onDeleteClick}
          onCancelClick={onCancelClick}
          loading={deleteAccountGroupMutation.isLoading}
          disabled={false}
          isForDelete={true}
        />
      }
    >
      {t('accountGroup.deleteForm.body')}
    </Modal>
  );
};

export default DeleteGroupModal;
