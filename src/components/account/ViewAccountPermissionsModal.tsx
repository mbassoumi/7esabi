import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentAccount_permissions } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { AccountPermissionInput } from '../../graphql/gql/globalTypes';
import { convertToAccountPermissionsInput } from '../../graphql/utils/typeHelpers';
import './styles/accountForm.scss';
import AccountPermissionsForm from './AccountPermissionsForm';

interface ViewAccountPermissionsModalProps {
  accountPermissions: GqlFragmentAccount_permissions[];
  onOk: () => any;
}

interface ViewAccountPermissionsModalState {
  accountPermissionInputs: AccountPermissionInput[];
}

const ViewAccountPermissionsModal = ({
  accountPermissions,
  onOk,
}: ViewAccountPermissionsModalProps) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    accountPermissionInputs: [],
  } as ViewAccountPermissionsModalState);

  useEffect(() => {
    setState({
      accountPermissionInputs:
        accountPermissions?.map((accountPermission) =>
          convertToAccountPermissionsInput(accountPermission)
        ) || [],
    });
  }, [accountPermissions]);

  const onOkClick = async (event: any) => {
    event.stopPropagation();
    onOk();
  };

  return (
    <Modal
      visible={true}
      title={t('accountPermission.list.title')}
      onCancel={onOkClick}
      footer={
        <Button key="ok" type="default" onClick={onOkClick}>
          {t('generic.actions.ok')}
        </Button>
      }
    >
      <div className="account-form__input">
        <AccountPermissionsForm
          accountPermissions={state.accountPermissionInputs}
        />
      </div>
    </Modal>
  );
};

export default ViewAccountPermissionsModal;
