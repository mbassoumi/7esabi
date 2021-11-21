import { faChartPie, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccountGroupsCollapsible from './AccountGroupsCollapsible';
import './styles/accountGroupsList.scss';
import AccountGroupFormModal from './AccountGroupFormModal';
import { useQuery } from 'react-query';
import { listAccountGroupApi } from '../../api/accountGroup';
import LoadingSpinner from '../shared/LoadingSpinner';
import {
  queryKeyForAccountGroupsList,
  refreshAccountGroups,
} from '../helpers/storeHelper';
import AccountStatsModal from '../account/AccountStatsModal';

interface AccountGroupsListModalsState {
  accountGroupFormModalVisible: boolean;
  accountStatsModalVisible: boolean;
}

const AccountGroupsList = () => {
  const { t } = useTranslation();

  // to load account groups... children components would read them from useQuery cache.
  const { isLoading } = useQuery(
    queryKeyForAccountGroupsList(),
    listAccountGroupApi
  );

  const [state, setState] = useState<AccountGroupsListModalsState>({
    accountGroupFormModalVisible: false,
    accountStatsModalVisible: false,
  });

  const onSaveAccountGroup = async (_mutationResponse: any) => {
    await refreshAccountGroups();
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {accountStatsModal}
      {state.accountGroupFormModalVisible && (
        <AccountGroupFormModal
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
