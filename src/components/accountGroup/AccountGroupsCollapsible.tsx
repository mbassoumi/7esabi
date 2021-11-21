import { faHandshake, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccountCard from '../account/AccountCard';
import { EntityActionButtons } from '../shared/EntityActionButtons';
import './styles/accountGroupsCollapsible.scss';
import { AccountGroup } from '../../@types/AccountGroup';
import DeleteGroupModal from './DeleteGroupModal';
import AccountGroupFormModal from './AccountGroupFormModal';
import {
  getCachedAccountGroups,
  refreshAccountGroups,
} from '../helpers/storeHelper';
import AccountFormModal from '../account/AccountFormModal';

interface AccountGroupsCollapsibleState {
  selectedAccountGroup: AccountGroup | null;
  accountFormModalVisible: boolean;
  accountGroupFormModalVisible: boolean;
  deleteAccountGroupModalVisible: boolean;
}

const AccountGroupsCollapsible = ({}) => {
  const { t } = useTranslation();
  const accountGroups = getCachedAccountGroups();

  const [state, setState] = useState<AccountGroupsCollapsibleState>({
    selectedAccountGroup: null,
    accountFormModalVisible: false,
    accountGroupFormModalVisible: false,
    deleteAccountGroupModalVisible: false,
  });

  const closeModals = () => {
    setState({} as any);
  };

  /*
   * Add Account Modal
   */

  const onSaveAccount = async (_mutationInfo: any) => {
    await refreshAccountGroups();
    closeModals();
  };

  const accountFormModal = state.accountFormModalVisible && (
    <AccountFormModal
      accountGroup={state.selectedAccountGroup!}
      onSave={onSaveAccount}
      onCancel={closeModals}
    />
  );

  const openAccountFormModal = (accountGroup: AccountGroup) => {
    setState((state) => ({
      ...state,
      selectedAccountGroup: accountGroup,
      accountFormModalVisible: true,
    }));
  };

  /*
   * Update Account Group Modal
   */
  const onSaveAccountGroup = async (mutationInfo: any) => {
    await refreshAccountGroups();
    closeModals();
  };

  const accountGroupFormModal = state.accountGroupFormModalVisible && (
    <AccountGroupFormModal
      accountGroup={state.selectedAccountGroup}
      onSave={onSaveAccountGroup}
      onCancel={closeModals}
    />
  );

  const openAccountGroupFormModal = (accountGroup: AccountGroup) => {
    setState((state) => ({
      ...state,
      selectedAccountGroup: accountGroup,
      accountGroupFormModalVisible: true,
    }));
  };

  /*
   *  Delete Account Group Modal
   */
  const onDeleteAccountGroup = async () => {
    await refreshAccountGroups();
    closeModals();
  };

  const deleteAccountGroupModal = state.deleteAccountGroupModalVisible && (
    <DeleteGroupModal
      accountGroup={state.selectedAccountGroup!}
      onDelete={onDeleteAccountGroup}
      onCancel={closeModals}
    />
  );

  const openDeleteGroupModal = (accountGroup: AccountGroup) => {
    setState((state) => ({
      ...state,
      selectedAccountGroup: accountGroup,
      deleteAccountGroupModalVisible: true,
    }));
  };

  /*
   * Add Account Button
   */
  const addAccountButton = (accountGroup: AccountGroup) => (
    <div className="account-groups-collapsible__add-account">
      <Button
        className="account-groups-collapsible__add-account__button"
        onClick={() => openAccountFormModal(accountGroup)}
      >
        <FontAwesomeIcon icon={faPlus} color="green" />
        <span>{t('account.actions.add')}</span>
      </Button>
    </div>
  );

  /*
   * other ui components
   */

  const accountGroupCollapsePanel = (accountGroup: AccountGroup) => {
    const isSharedGroup = accountGroup.name === 'shared_with_me';
    const accountGroupName = isSharedGroup
      ? t('dashboard.sharedWithMeGroup')
      : accountGroup.name;

    return (
      <Collapse.Panel
        key={accountGroup.id}
        header={accountGroupName}
        className="account-groups-collapsible__panel"
        extra={
          !isSharedGroup ? (
            <EntityActionButtons
              ownerEntity={accountGroup}
              translationIndex="accountGroup"
              onEditButton={openAccountGroupFormModal}
              onDeleteButton={openDeleteGroupModal}
            />
          ) : (
            <FontAwesomeIcon icon={faHandshake} />
          )
        }
      >
        {!isSharedGroup && addAccountButton(accountGroup)}
        {accountGroup!.accounts?.map((account: any) => {
          return (
            <div
              key={`account_${account.id}_card`}
              className="account-groups-collapsible__item"
            >
              <AccountCard account={account} />
            </div>
          );
        })}
      </Collapse.Panel>
    );
  };

  return (
    <>
      {accountFormModal}
      {accountGroupFormModal}
      {deleteAccountGroupModal}
      <Collapse
        defaultActiveKey={[1]}
        className="account-groups-collapsible"
        key="0-1"
      >
        {accountGroups?.map((accountGroup) =>
          accountGroupCollapsePanel(accountGroup)
        )}
      </Collapse>
    </>
  );
};

export default AccountGroupsCollapsible;
