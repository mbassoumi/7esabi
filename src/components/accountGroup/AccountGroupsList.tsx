import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccountGroupFormModal from './AccountGroupFormModal';
import AccountGroupsCollapsible from './AccountGroupsCollapsible';
import './styles/accountGroupsList.scss';

interface AccountGroupsListModalsState {
  accountGroupFormModalVisible: boolean;
}

const AccountGroupsList = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    accountGroupFormModalVisible: false,
  } as AccountGroupsListModalsState);

  const onSaveAccountGroup = async (mutationInfo: any) => {
    closeModals();
  };

  const closeModals = () => {
    setState({} as any);
  };

  /*
   * base button's actions (for the buttons that would open the modals above)
   */
  const onAddAccountGroupButtonClick = () => {
    setState((state) => ({ ...state, accountGroupFormModalVisible: true }));
  };

  /*
   * ui
   */

  return (
    <>
      {state.accountGroupFormModalVisible && (
        <AccountGroupFormModal
          updateMode={false}
          onSave={onSaveAccountGroup}
          onCancel={closeModals}
        />
      )}
      <div className="account-groups-list">
        <div className="account-groups-list__add-account-group">
          <Button
            className="account-groups-list__add-account-group__button"
            onClick={onAddAccountGroupButtonClick}
          >
            <FontAwesomeIcon icon={faPlus} color="green" />
            <span>{t('accountGroup.actions.add')}</span>
          </Button>
        </div>
        <AccountGroupsCollapsible />
      </div>
    </>
  );
};

export default AccountGroupsList;
