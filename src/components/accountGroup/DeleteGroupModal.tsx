import { useMutation } from '@apollo/client';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GQL_DELETE_ACCOUNT_GROUP } from '../../graphql/gql/accountGroup/delete';
import { GqlDeleteAccountGroup } from '../../graphql/gql/accountGroup/types/GqlDeleteAccountGroup';
import { GqlFragmentAccountGroup } from '../../graphql/gql/client-schema/types/GqlFragmentAccountGroup';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';

interface DeleteGroupModalProps {
  accountGroup: GqlFragmentAccountGroup;
  onDelete: (mutationInfo: any) => any;
  onCancel: (event: any) => any;
}

const DeleteGroupModal = ({
  accountGroup,
  onDelete,
  onCancel,
}: DeleteGroupModalProps) => {
  const { t } = useTranslation();

  const [deleteAccountGroupFn, deleteAccountGroupMutationInfo] = useMutation<
    GqlDeleteAccountGroup
  >(GQL_DELETE_ACCOUNT_GROUP);

  const onDeleteClick = async (event: any) => {
    event.stopPropagation();

    try {
      const data = await deleteAccountGroupFn({
        variables: { id: accountGroup!.id },
      });

      message.success(
        t(`messages.accountGroup.deleted`),
        DEFAULT_SUCCESS_MESSAGE_DURATION
      );

      onDelete(data);
    } catch (error) {
      console.log('error', error);
      message.error(
        t(`messages.account.deletingFailed`),
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
          loading={deleteAccountGroupMutationInfo.loading}
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
