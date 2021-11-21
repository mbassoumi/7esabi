import { faAddressBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  getCachedCurrentUser,
  getCachedUserInfo,
  refreshAccount,
  refreshAccountGroups,
} from '../helpers/storeHelper';
import CurrencyIcon from '../shared/Currency';
import { EntityActionButtons } from '../shared/EntityActionButtons';
import './styles/accountCard.scss';
import { Account } from '../../@types/Account';
import { AccountTransactionType } from '../../@types/enums';
import {
  accountFullName,
  convertApiDateStringToDisplayString,
} from '../../utils/helpers';
import AccountFormModal from './AccountFormModal';
import DeleteAccountModal from './DeleteAccountModal';
import ViewAccountPermissionsModal from './ViewAccountPermissionsModal';

interface AccountCardProps {
  account: Account;
  isInFullAccountMode?: boolean;
}

interface AccountCardState {
  accountFormModalVisible: boolean;
  deleteAccountModalVisible: boolean;
  viewAccountPermissionsModalVisible: boolean;
}

const AccountCard = ({
  account,
  isInFullAccountMode = false,
}: AccountCardProps) => {
  const { t, i18n } = useTranslation();
  const currentUser = getCachedCurrentUser();
  const accountUser = getCachedUserInfo(account.account_group.user_id)!;
  const lastTransactionUser = account.last_transaction?.user_id
    ? getCachedUserInfo(account.last_transaction!.user_id)
    : null;
  const isAccountForCurrentUser = currentUser.id === accountUser.id;
  const isSharedAccount = !isEmpty(account.permissions); // i.e. is shared by multiple people

  const [state, setState] = useState<AccountCardState>({
    accountFormModalVisible: false,
    deleteAccountModalVisible: false,
    viewAccountPermissionsModalVisible: false,
  });

  const closeModals = () => {
    setState({} as any);
  };

  /*
   * Update Account Modal
   */

  const onSaveAccount = async (mutationInfo: any) => {
    if (isInFullAccountMode) {
      await refreshAccount(account.id);
    } else {
      await refreshAccountGroups();
    }
    closeModals();
  };

  const accountFormModal = state.accountFormModalVisible && (
    <AccountFormModal
      accountGroup={account.account_group}
      onSave={onSaveAccount}
      onCancel={closeModals}
      account={account}
    />
  );

  const openAccountFormModal = (account: Account) => {
    setState((state) => ({
      ...state,
      accountFormModalVisible: true,
    }));
  };

  /*
   * Delete Account
   */
  const onDeleteAccount = async (mutationInfo: any) => {
    if (isInFullAccountMode) {
      // redirect to dashboard
      const url = `/?accountDeleted=true&accountGroup=${account.account_group.id}`;
      window.location.assign(url);
    } else {
      await refreshAccountGroups();
    }
    return;
  };

  const deleteAccountModal = state.deleteAccountModalVisible && (
    <DeleteAccountModal
      account={account}
      onDelete={onDeleteAccount}
      onCancel={closeModals}
    />
  );

  const openDeleteAccountModal = (account: Account) => {
    setState((state) => ({
      ...state,
      deleteAccountModalVisible: true,
    }));
  };

  /*
   * View Account Permissions for Shared accounts
   */
  const viewAccountPermissionsModal =
    state.viewAccountPermissionsModalVisible && (
      <ViewAccountPermissionsModal
        accountPermissions={account.permissions}
        onOk={closeModals}
      />
    );

  const showViewAccountPermissionsModal = () => {
    setState((state) => ({
      ...state,
      viewAccountPermissionsModalVisible: true,
    }));
  };

  /*
   * Action buttons
   */

  const viewAccountPermissionsButton = (
    <Tooltip
      placement="topLeft"
      title={t(`account.card.permissions`)}
      arrowPointAtCenter
    >
      <Button
        className="entity-action-buttons__button"
        onClick={showViewAccountPermissionsModal}
      >
        <FontAwesomeIcon icon={faAddressBook} color="blue" />
      </Button>
    </Tooltip>
  );

  const accountActionButtons = () => {
    const onEditButton = isAccountForCurrentUser ? openAccountFormModal : null;
    const onDeleteButton = isAccountForCurrentUser
      ? openDeleteAccountModal
      : null;
    const extraButtons = (
      <>{!isAccountForCurrentUser && viewAccountPermissionsButton}</>
    );

    return (
      <EntityActionButtons
        ownerEntity={account}
        translationIndex="account"
        onEditButton={onEditButton}
        onDeleteButton={onDeleteButton}
        extraButtons={extraButtons}
      />
    );
  };

  /*
   * UI parts
   */

  const currencyIcon = <CurrencyIcon currencyType={account.currency} />;

  const lastActivity = () => {
    if (isEmpty(account.last_transaction))
      return <>{t('account.card.noActivities')}</>;

    const lastTransaction = account.last_transaction!;

    const userName = lastTransactionUser?.first_name || currentUser.first_name;

    const operation =
      lastTransaction.transaction_type === AccountTransactionType.CREDIT
        ? t('transaction.operation.added')
        : t('transaction.operation.withdrew');

    const amount = lastTransaction.amount;
    const currencyName = t(`account.currency.${account.currency}`);
    const date = convertApiDateStringToDisplayString(lastTransaction.date);

    return (
      <>
        {`${userName} ${operation} ${amount} ${currencyName} ${t(
          'account.card.on'
        )}: ${date}`}
      </>
    );
  };

  const sharedAccountInfo = () => {
    const ownerName = isAccountForCurrentUser
      ? t('user.you')
      : accountUser.first_name;

    const ownerText = `${t('account.card.owner')}: ${ownerName}`;

    let ownerTextPart = '';
    if (isInFullAccountMode) {
      ownerTextPart = ownerText;
    } else if (!isAccountForCurrentUser) {
      ownerTextPart = `, ${ownerText}`;
    }

    if (isInFullAccountMode) {
      return (
        <div className="account-card__container__line__full-size">
          <div className="account-card__shared-icon-info__full-size">
            <span className="account-card__shared-icon-info__icon__full-size">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <div className="account-card__shared-icon-info__owner__full-size">
              {ownerTextPart}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="account-card__container__line">
          <div className="account-card__shared-icon-info">
            <span className="account-card__shared-icon-info__icon">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <div className="account-card__shared-icon-info__owner">
              {`${accountName()} ${ownerTextPart}`}
            </div>
          </div>
        </div>
      );
    }
  };

  const accountName = () => {
    if (!isAccountForCurrentUser) {
      return `${accountFullName(account)}`;
    }
    return `${account.name}`;
  };

  const accountNameLine = (
    <div className="account-card__title">{accountName()}</div>
  );

  const balanceAmount = (
    <span className="account-card__balance__amount">
      {Number(account.balance || 0).toLocaleString()}
    </span>
  );

  const balance = () => {
    const mainClass = `account-card__balance${
      isInFullAccountMode ? '__full-size' : ''
    }`;

    const classNegative =
      (account?.balance || 0) < 0 ? 'account-card__balance__negative' : '';
    return (
      <div className={`${mainClass} ${classNegative}`}>
        <span>{currencyIcon}</span>
        {balanceAmount}
      </div>
    );
  };

  const entityControlButtonsRtlClass: any =
    i18n.dir() === 'rtl' ? 'account-card__entity-control-buttons__rtl' : '';

  const accountCard = (
    <div className="account-card">
      <div
        className={`account-card__entity-control-buttons ${entityControlButtonsRtlClass}`}
      >
        {accountActionButtons()}
      </div>
      <Link
        to={`/accountGroup/${account.account_group.id}/account/${account.id}`}
        key={`account_${account.id}_link`}
      >
        <div className="account-card__container">
          {isSharedAccount ? sharedAccountInfo() : accountNameLine}
          <div className="account-card__container__line">{balance()}</div>
          <div className="account-card__container__line">
            <div className="account-card__last-activity">{lastActivity()}</div>
          </div>
        </div>
      </Link>
    </div>
  );

  const accountCardFull = (
    <div className="account-card__full-size">
      <div
        className={`account-card__entity-control-buttons__full-size ${entityControlButtonsRtlClass}`}
      >
        {accountActionButtons()}
      </div>
      <div className="account-card__container__full-size">
        {isSharedAccount && sharedAccountInfo()}
        <div className="account-card__container__line__full-size">
          {balance()}
        </div>
        <div className="account-card__container__line__full-size">
          <div className="account-card__last-activity__full-size">
            {lastActivity()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {account && !isInFullAccountMode ? accountCard : accountCardFull}
      {accountFormModal}
      {deleteAccountModal}
      {viewAccountPermissionsModal}
    </>
  );
};

export default AccountCard;
