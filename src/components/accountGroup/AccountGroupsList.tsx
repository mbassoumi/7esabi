import { faChartPie, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccountStatsModal from '../account/AccountStatsModal';
import AccountGroupFormModal from './AccountGroupFormModal';
import AccountGroupsCollapsible from './AccountGroupsCollapsible';
import './styles/accountGroupsList.scss';

interface AccountGroupsListModalsState {
  accountGroupFormModalVisible: boolean;
  accountStatsModalVisible: boolean;
}

const AccountGroupsList = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    accountGroupFormModalVisible: false,
    accountStatsModalVisible: false,
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
   * View Account Stats
   */
  const accountStatsModal = state.accountStatsModalVisible && (
    <AccountStatsModal onOk={closeModals} />
  );

  const showViewStatsModal = () => {
    setState((state) => ({
      ...state,
      accountStatsModalVisible: true,
    }));
  };

  const viewStatsButton = (
    <Tooltip
      placement="topLeft"
      title={t(`account.card.stats`)}
      arrowPointAtCenter
    >
      <Button
        className="entity-action-buttons__button"
        onClick={showViewStatsModal}
      >
        <FontAwesomeIcon icon={faChartPie} color="crimson" />
      </Button>
    </Tooltip>
  );

  /*
   * ui
   */

  return (
    <>
      {accountStatsModal}
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
          {viewStatsButton}
        </div>
        <AccountGroupsCollapsible />
      </div>
    </>
  );
};

export default AccountGroupsList;
