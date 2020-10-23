import { useMutation } from '@apollo/client';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GQL_DELETE_ACCOUNT } from '../../graphql/gql/account/delete';
import { GqlDeleteAccount } from '../../graphql/gql/account/types/GqlDeleteAccount';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import {
  DEFAULT_ERROR_MESSAGE_DURATION,
  DEFAULT_SUCCESS_MESSAGE_DURATION,
} from '../../utils/appVars';
import FormModalFooter from '../shared/FormModalFooter';

interface DeleteAccountModalProps {
  account: GqlFragmentAccount;
  onDelete: (mutationInfo: any) => any;
  onCancel: (event: any) => any;
}

const DeleteAccountModal = ({
  account,
  onDelete,
  onCancel,
}: DeleteAccountModalProps) => {
  const { t } = useTranslation();

  const [deleteAccountFn, deleteAccountMutationInfo] = useMutation<
    GqlDeleteAccount
  >(GQL_DELETE_ACCOUNT);

  const onDeleteClick = async (event: any) => {
    event.stopPropagation();

    try {
      const data = await deleteAccountFn({
        variables: { id: account!.id },
      });

      message.success(
        t(`messages.account.deleted`),
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
          {`${t('account.deleteForm.title')} : ${account.name}`}
        </span>
      }
      onCancel={onCancelClick}
      footer={
        <FormModalFooter
          onSaveOrDeleteClick={onDeleteClick}
          onCancelClick={onCancelClick}
          loading={deleteAccountMutationInfo.loading}
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
