import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/accountForm.scss';
import AccountPermissionsForm from './AccountPermissionsForm';
import { AccountPermission } from '../../@types/AccountPermission';
import { AccountPermissionParams } from '../../api/account';
import { initAccountPermissionParamsList } from '../../utils/helpers';

interface ViewAccountPermissionsModalProps {
  accountPermissions: AccountPermission[];
  onOk: () => any;
}

interface ViewAccountPermissionsModalState {
  accountPermissionParamsList: AccountPermissionParams[];
}

const ViewAccountPermissionsModal = ({
  accountPermissions = [],
  onOk,
}: ViewAccountPermissionsModalProps) => {
  const { t } = useTranslation();

  const [state, setState] = useState<ViewAccountPermissionsModalState>({
    accountPermissionParamsList: [],
  });

  useEffect(() => {
    setState({
      accountPermissionParamsList:
        initAccountPermissionParamsList(accountPermissions),
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
          accountPermissionParamsList={state.accountPermissionParamsList}
        />
      </div>
    </Modal>
  );
};

export default ViewAccountPermissionsModal;
