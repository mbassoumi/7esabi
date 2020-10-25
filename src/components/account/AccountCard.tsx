import {
  faAddressBook,
  faPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import { format } from 'date-and-time';
import { get, isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { GqlFragmentAccountGroup } from '../../graphql/gql/client-schema/types/GqlFragmentAccountGroup';
import { TransactionType } from '../../graphql/gql/globalTypes';
import { DEFAULT_DATE_FORMAT } from '../../utils/appVars';
import {
  useAccountPermission,
  useBasicUserInfo,
  useCurrentUser,
} from '../helpers/storeHelper';
import CurrencyIcon from '../shared/Currency';
import { EntityActionButtons } from '../shared/EntityActionButtons';
import TransactionFormModal from '../transaction/TransactionFormModal';
import AccountFormModal from './AccountFormModal';
import DeleteAccountModal from './DeleteAccountModal';
import './styles/accountCard.scss';
import ViewAccountPermissionsModal from './ViewAccountPermissionsModal';

interface AccountCardProps {
  account: GqlFragmentAccount;
  accountGroup: GqlFragmentAccountGroup | null;
  isInFullAccountMode?: boolean;
  resetTransactionsList?: () => any;
}

interface AccountCardState {
  transactionFormModalVisible: boolean;
  accountFormModalVisible: boolean;
  deleteAccountModalVisible: boolean;
  viewAccountPermissionsModalVisible: boolean;
}

const AccountCard = ({
  account,
  accountGroup = null,
  isInFullAccountMode = false,
  resetTransactionsList,
}: AccountCardProps) => {
  const { t, i18n } = useTranslation();
  const currentUser = useCurrentUser()!;
  const accountUser = useBasicUserInfo(account.accountGroup.user.id)!;
  const lastTransactionUser = useBasicUserInfo(
    get(account, 'lastTransaction.user.id', null)
  );
  const isAccountForCurrentUser = currentUser.id === accountUser.id;
  const accountPermission = useAccountPermission(account.id);

  const [state, setState] = useState({
    transactionFormModalVisible: false,
    accountFormModalVisible: false,
    deleteAccountModalVisible: false,
    viewAccountPermissionsModalVisible: false,
  } as AccountCardState);

  const closeModals = () => {
    setState({} as any);
  };

  /*
   * Add Transaction
   */

  const onSaveTransaction = (mutationInfo: any) => {
    closeModals();
    if (resetTransactionsList) {
      resetTransactionsList();
    }
  };

  const transactionFormModal = state.transactionFormModalVisible && (
    <TransactionFormModal
      onSave={onSaveTransaction}
      onCancel={closeModals}
      account={account!}
    />
  );

  const openTransactionFormModal = (event: any) => {
    setState((state) => ({
      ...state,
      transactionFormModalVisible: true,
    }));
  };

  /*
   * Update Account Modal
   */

  const onSaveAccount = (mutationInfo: any) => {
    closeModals();
  };

  const accountFormModal = state.accountFormModalVisible && (
    <AccountFormModal
      onSave={onSaveAccount}
      onCancel={closeModals}
      updateMode={true}
      account={account}
      accountGroup={accountGroup}
      disableAccountSelection={isInFullAccountMode}
      allAccountGroups={currentUser?.accountGroups! as any}
    />
  );

  const openAccountFormModal = (account: GqlFragmentAccount) => {
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
      let url = `/?accountDeleted=true`;
      if (accountGroup) {
        url += `&accountGroup=${accountGroup!.id}`;
      }
      window.location.assign(url);
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

  const openDeleteAccountModal = (account: GqlFragmentAccount) => {
    setState((state) => ({
      ...state,
      deleteAccountModalVisible: true,
    }));
  };

  /*
   * View Account Permissions for Shared accounts
   */
  const viewAccountPermissionsModal = state.viewAccountPermissionsModalVisible && (
    <ViewAccountPermissionsModal
      accountPermissions={account.permissions!}
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
    const extraButtons = account.isShared && (
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
    if (isEmpty(account.lastTransaction))
      return <>{t('account.card.noActivities')}</>;

    const lastTransaction = account.lastTransaction!;

    const userName = lastTransactionUser?.fullName || currentUser.fullName;

    const operation =
      lastTransaction.type === TransactionType.CREDIT
        ? t('transaction.operation.added')
        : t('transaction.operation.withdrew');

    const amount = lastTransaction.amount;
    const currencyName = t(`account.currency.${account.currency}`);
    const date = format(
      new Date(lastTransaction.date),
      DEFAULT_DATE_FORMAT,
      false
    );

    return (
      <>
        {`${userName} ${operation} ${amount} ${currencyName} ${t(
          'account.card.on'
        )}: ${date}`}
      </>
    );
  };

  const accountSharedInfo = () => {
    const ownerName = isAccountForCurrentUser
      ? t('user.you')
      : accountUser.fullName;

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
              {`${accountFullName()} ${ownerTextPart}`}
            </div>
          </div>
        </div>
      );
    }
  };

  const accountFullName = () => {
    if (!isAccountForCurrentUser) {
      return `${account.fullName}`;
    }
    return `${account.name}`;
  };

  const accountNameLine = (
    <div className="account-card__title">{accountFullName()}</div>
  );

  const balanceAmount = (
    <span className="account-card__balance__amount">
      {Number(account.amount || 0).toLocaleString()}
    </span>
  );

  const balance = () => {
    const mainClass = `account-card__balance${
      isInFullAccountMode ? '__full-size' : ''
    }`;

    const classNegative =
      (account?.amount || 0) < 0 ? 'account-card__balance__negative' : '';
    return (
      <div className={`${mainClass} ${classNegative}`}>
        <span>{currencyIcon}</span>
        {balanceAmount}
      </div>
    );
  };

  const addTransactionsButton = (isAccountForCurrentUser ||
    accountPermission?.canEdit) && (
    <div className="account-card__add-transactions">
      <Button
        className="account-card__add-transactions__button"
        onClick={openTransactionFormModal}
      >
        <FontAwesomeIcon icon={faPlus} color="green" />
        <span>{t('transaction.actions.add')}</span>
      </Button>
    </div>
  );

  const entityControlButtonsRtlClass: any =
    i18n.dir() === 'rtl' ? 'account-card__entity-control-buttons__rtl' : '';

  const accountCard = (
    <div className="account-card">
      <div
        className={`account-card__entity-control-buttons ${entityControlButtonsRtlClass}`}
      >
        {accountActionButtons()}
      </div>
      <Link to={`/account/${account.id}`} key={`account_${account.id}_link`}>
        <div className="account-card__container">
          {account.isShared ? accountSharedInfo() : accountNameLine}
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
        {account.isShared && accountSharedInfo()}
        <div className="account-card__container__line__full-size">
          {balance()}
        </div>
        <div className="account-card__container__line__full-size">
          <div className="account-card__last-activity__full-size">
            {lastActivity()}
          </div>
        </div>
      </div>
      {addTransactionsButton}
    </div>
  );

  return (
    <>
      {account && !isInFullAccountMode ? accountCard : accountCardFull}
      {transactionFormModal}
      {accountFormModal}
      {deleteAccountModal}
      {viewAccountPermissionsModal}
    </>
  );
};

export default AccountCard;
