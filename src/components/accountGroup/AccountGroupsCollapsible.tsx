import {
  faEye,
  faEyeSlash,
  faHandshake,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse, Switch } from 'antd';
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
import { concat, filter, includes, without } from 'lodash';
import { Account } from '../../@types/Account';

interface AccountGroupsCollapsibleState {
  globalArchivedMode: boolean;
  inArchivedMode: number[];
  selectedAccountGroup: AccountGroup | null;
  accountFormModalVisible: boolean;
  accountGroupFormModalVisible: boolean;
  deleteAccountGroupModalVisible: boolean;
}

const AccountGroupsCollapsible = ({}) => {
  const { t } = useTranslation();
  const accountGroups = getCachedAccountGroups();

  const [state, setState] = useState<AccountGroupsCollapsibleState>({
    globalArchivedMode: false,
    inArchivedMode: [],
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
    <Button
      className="account-groups-collapsible__add-account__button"
      onClick={() => openAccountFormModal(accountGroup)}
    >
      <FontAwesomeIcon icon={faPlus} color="green" />
      <span>{t('account.actions.add')}</span>
    </Button>
  );

  /*
   * Show Archived Button
   */

  const setArchivedAccountsButton = (
    accountGroup: AccountGroup,
    archivedMode: boolean
  ) => {
    setState((state) => {
      let inArchivedMode: number[];
      if (archivedMode) {
        inArchivedMode = concat(state.inArchivedMode, [accountGroup.id]);
      } else {
        inArchivedMode = without(state.inArchivedMode, accountGroup.id);
      }
      return {
        ...state,
        inArchivedMode: inArchivedMode,
      };
    });
  };

  const filteredAccountsList = (accountGroup: AccountGroup) => {
    const accounts = accountGroup!.accounts || [];

    // don't filter accounts if we are showing only archived account groups (i.e. the whole account group is archived)
    if (state.globalArchivedMode) {
      return accounts;
    }

    const archivedMode = includes(state.inArchivedMode, accountGroup.id);
    return (
      filter(accounts, (account) => account.archived === archivedMode) ||
      ([] as Account[])
    );
  };

  const filteredAccountGroupsList = () => {
    return (
      filter(
        accountGroups,
        (accountGroup) =>
          accountGroup.archived === (state.globalArchivedMode || false)
      ) || ([] as AccountGroup[])
    );
  };

  const setArchivedAccountGroupsButton = (globalArchivedMode: boolean) => {
    setState((state) => {
      return {
        ...state,
        globalArchivedMode: globalArchivedMode,
      };
    });
  };

  const archivedAccountGroupsModeSwitch = () => {
    const archivedAccountGroupsCount =
      filter(
        accountGroups || [],
        (accountGroup) => accountGroup.archived == true
      )?.length || 0;

    const switchLabel = `${t(
      'accountGroup.actions.showArchived'
    )} (${archivedAccountGroupsCount})`;

    return (
      <Switch
        className="account-groups-collapsible__panel__action-buttons__archived-mode"
        onChange={(enabled) => setArchivedAccountGroupsButton(enabled)}
        checkedChildren={
          <span>
            {' '}
            <FontAwesomeIcon icon={faEye} />
            {switchLabel}
          </span>
        }
        unCheckedChildren={
          <span>
            <FontAwesomeIcon icon={faEyeSlash} color="gray" />
            {switchLabel}
          </span>
        }
        checked={state.globalArchivedMode}
      />
    );
  };

  const archivedAccountsModeSwitch = (accountGroup: AccountGroup) => {
    const archivedAccountsCount =
      filter(accountGroup.accounts || [], (account) => account.archived == true)
        ?.length || 0;

    const switchLabel = `${t(
      'accountGroup.actions.showArchived'
    )} (${archivedAccountsCount})`;

    return (
      <Switch
        className="account-groups-collapsible__panel__action-buttons__archived-mode"
        onChange={(enabled) => setArchivedAccountsButton(accountGroup, enabled)}
        checkedChildren={
          <span>
            {' '}
            <FontAwesomeIcon icon={faEye} />
            {switchLabel}
          </span>
        }
        unCheckedChildren={
          <span>
            <FontAwesomeIcon icon={faEyeSlash} color="gray" />
            {switchLabel}
          </span>
        }
        checked={includes(state.inArchivedMode, accountGroup.id)}
      />
    );
  };

  /*
   * other ui components
   */

  const accountGroupPanelActionButtons = (
    accountGroup: AccountGroup,
    isSharedGroup = false
  ) => (
    <div
      className="account-groups-collapsible__panel__action-buttons"
      onClick={(event) => event.stopPropagation()}
    >
      {!isSharedGroup && addAccountButton(accountGroup)}
      {!state.globalArchivedMode && archivedAccountsModeSwitch(accountGroup)}
    </div>
  );

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
        {accountGroupPanelActionButtons(accountGroup, isSharedGroup)}
        {filteredAccountsList(accountGroup!).map((account: any) => {
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
      {archivedAccountGroupsModeSwitch()}
      <Collapse
        defaultActiveKey={[1]}
        className="account-groups-collapsible"
        key="0-1"
      >
        {filteredAccountGroupsList()?.map((accountGroup) =>
          accountGroupCollapsePanel(accountGroup)
        )}
      </Collapse>
    </>
  );
};

export default AccountGroupsCollapsible;
