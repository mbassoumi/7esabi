import { faHandshake, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GqlFragmentAccountGroup } from '../../graphql/gql/client-schema/types/GqlFragmentAccountGroup';
import AccountCard from '../account/AccountCard';
import AccountFormModal from '../account/AccountFormModal';
import { useCurrentUser } from '../helpers/storeHelper';
import { EntityActionButtons } from '../shared/EntityActionButtons';
import AccountGroupFormModal from './AccountGroupFormModal';
import DeleteGroupModal from './DeleteGroupModal';
import '../styles/accountGroupsCollapsible.scss';

interface AccountGroupsCollapsibleProps {}

interface AccountGroupsCollapsibleState {
  selectedAccountGroup: GqlFragmentAccountGroup | null;
  accountFormModalVisible: boolean;
  accountGroupFormModalVisible: boolean;
  deleteAccountGroupModalVisible: boolean;
}

const AccountGroupsCollapsible = ({}: AccountGroupsCollapsibleProps) => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  const [state, setState] = useState({
    selectedAccountGroup: null,
    accountFormModalVisible: false,
    accountGroupFormModalVisible: false,
    deleteAccountGroupModalVisible: false,
  } as AccountGroupsCollapsibleState);

  const closeModals = () => {
    setState({} as any);
  };

  /*
   * Add Account Modal
   */

  const onSaveAccount = (mutationInfo: any) => {
    closeModals();
  };

  const accountFormModal = state.accountFormModalVisible && (
    <AccountFormModal
      onSave={onSaveAccount}
      onCancel={closeModals}
      updateMode={false}
      accountGroup={state.selectedAccountGroup!}
      allAccountGroups={currentUser?.accountGroups! as any}
    />
  );

  const openAccountFormModal = (accountGroup: GqlFragmentAccountGroup) => {
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
    closeModals();
  };

  const accountGroupFormModal = state.accountGroupFormModalVisible && (
    <AccountGroupFormModal
      updateMode={!isEmpty(state.selectedAccountGroup)}
      accountGroup={state.selectedAccountGroup}
      onSave={onSaveAccountGroup}
      onCancel={closeModals}
    />
  );

  const openAccountGroupFormModal = (accountGroup: GqlFragmentAccountGroup) => {
    setState((state) => ({
      ...state,
      selectedAccountGroup: accountGroup,
      accountGroupFormModalVisible: true,
    }));
  };

  /*
   *  Delete Account Group Modal
   */
  const onDeleteAccountGroup = async (mutationInfo: any) => {
    closeModals();
  };

  const deleteAccountGroupModal = state.deleteAccountGroupModalVisible && (
    <DeleteGroupModal
      accountGroup={state.selectedAccountGroup!}
      onDelete={onDeleteAccountGroup}
      onCancel={closeModals}
    />
  );

  const openDeleteGroupModal = (accountGroup: GqlFragmentAccountGroup) => {
    setState((state) => ({
      ...state,
      selectedAccountGroup: accountGroup,
      deleteAccountGroupModalVisible: true,
    }));
  };

  console.log('roooooooooonder');

  const addAccountButton = (accountGroup: GqlFragmentAccountGroup) => (
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

  const accountGroupCollapsePanel = (
    accountGroup: GqlFragmentAccountGroup,
    isSharedGroup = false
  ) => {
    return (
      <Collapse.Panel
        key={accountGroup.id}
        header={accountGroup.name}
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
        {accountGroup!.accounts?.map((account) => {
          return (
            <div
              key={`account_${account.id}_card`}
              className="account-groups-collapsible__item"
            >
              <AccountCard account={account} accountGroup={accountGroup} />
            </div>
          );
        })}
      </Collapse.Panel>
    );
  };

  const sharedWithMeGroup = () => {
    const sharedAccounts =
      currentUser!.accountPermissions?.map(
        (accountPermission) => accountPermission.account
      ) || [];
    const accountGroup: GqlFragmentAccountGroup = {
      __typename: 'AccountGroup',
      id: 'external_accounts',
      name: t('dashboard.sharedWithMeGroup'),
      accounts: sharedAccounts,
    };
    return accountGroupCollapsePanel(accountGroup, true);
  };

  return (
    <>
      {accountFormModal}
      {accountGroupFormModal}
      {deleteAccountGroupModal}
      <Collapse defaultActiveKey={[1]} className="account-groups-collapsible">
        {currentUser!.accountGroups?.map((accountGroup) =>
          accountGroupCollapsePanel(accountGroup)
        )}
        {sharedWithMeGroup()}
      </Collapse>
    </>
  );
};

export default AccountGroupsCollapsible;
