import { Alert, Button, Modal, Select } from 'antd';
import { concat, flatten, isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'react-minimal-pie-chart';
import { GqlSessionDataQuery_sessionData_user } from '../../graphql/gql/auth/types/GqlSessionDataQuery';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { useCurrentUser } from '../helpers/storeHelper';
import './styles/accountStatsModal.scss';

const COLORS = [
  '#0088FE',
  '#10d4af',
  '#ee004a',
  '#699b5d',
  '#fd00db',
  '#FFBB28',
  '#0fb85d',
  '#532916',
  '#42077c',
  '#f3fc41',
  '#b5f1f1',
  '#cfe3b1',
];

interface AccountStatsModalProps {
  onOk: () => any;
}

interface AccountStatsModalState {
  selectedAccounts: GqlFragmentAccount[];
}

const extractAllAccounts = (user: GqlSessionDataQuery_sessionData_user) => {
  const ownedAccounts = flatten(
    user.accountGroups?.map((accountGroup) => accountGroup.accounts) || []
  );

  const externalAccounts =
    user.accountPermissions?.map(
      (accountPermission) => accountPermission.account
    ) || [];

  return concat(ownedAccounts, externalAccounts);
};

const AccountStatsModal = ({ onOk }: AccountStatsModalProps) => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser()!;
  const allAccounts = extractAllAccounts(currentUser);

  const [state, setState] = useState({
    selectedAccounts: [],
  } as AccountStatsModalState);

  const creditAccounts: GqlFragmentAccount[] = [];
  const debitAccounts: GqlFragmentAccount[] = [];
  let chartData: any = [];

  const filteredOptions = allAccounts.filter(
    (account) => !state.selectedAccounts.includes(account! as any)
  ) as any;

  const onOkClick = async (event: any) => {
    event.stopPropagation();
    onOk();
  };

  const onSelectedAccountsChange = (selectedAccountIdsOrNames: string[]) => {
    setState((state) => ({
      ...state,
      selectedAccounts: allAccounts.filter(
        (account) =>
          selectedAccountIdsOrNames.includes(account!.id) ||
          selectedAccountIdsOrNames.includes(account!.fullName)
      ) as any,
    }));
  };

  const renderCustomizedLabel = ({ dataEntry }: any) => {
    const name = dataEntry.title;
    const percentage = `${dataEntry.percentage.toFixed(0)}%`;
    return `${percentage} - ${name}`;
  };

  const pieChart = () => {
    return (
      <div className="account-stats-modal__chart">
        <PieChart
          animate
          data={chartData || []}
          label={renderCustomizedLabel}
          radius={20}
          labelPosition={110}
          viewBoxSize={[100, 100]}
          center={[50, 50]}
          segmentsShift={1}
          labelStyle={{ fontSize: '10px' }}
        />
      </div>
    );
  };

  const detailsList = (dataList: GqlFragmentAccount[], amount: number) => {
    return (
      <div className="account-stats-modal__details-list">
        <div>
          {amount >= 0
            ? t('account.card.participation')
            : t('account.card.debits')}
          :
        </div>
        <ul>
          {dataList.map((account) => {
            return (
              <li key={account.id}>
                {`${account.fullName}: ${Number(
                  account.amount
                ).toLocaleString()} ${t(
                  `account.currency.${account.currency}`
                )}`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const modalContent = () => {
    let totalCreditAmounts = 0;
    for (let account of state.selectedAccounts! || []) {
      if (account!.amount! >= 0) {
        totalCreditAmounts = totalCreditAmounts + account.amount!;
        creditAccounts.push(account);
      } else {
        debitAccounts.push(account);
      }
    }

    if (isEmpty(creditAccounts) && isEmpty(debitAccounts)) {
      return (
        <Alert message={t('generic.messages.noDataFound')} type={'info'} />
      );
    }

    // filter out any amount that is less than < 3% of the amount so that
    // the chart won't become crowded and over each other
    let insignificantAmounts = 0;
    let index = 0;
    const significantAmountThreshold = totalCreditAmounts * 0.03;
    for (let account of creditAccounts) {
      if (account.amount! >= significantAmountThreshold) {
        chartData.push({
          title: account.fullName,
          value: account.amount,
          color: COLORS[index % COLORS.length],
        });
        index = index + 1;
      } else {
        insignificantAmounts = insignificantAmounts + account.amount!;
      }
    }

    if (insignificantAmounts > 0) {
      chartData.push({
        title: t('generic.words.others'),
        value: insignificantAmounts,
        color: COLORS[index % COLORS.length],
      });
    }

    return (
      <>
        {!isEmpty(chartData) && pieChart()}
        {!isEmpty(creditAccounts) && detailsList(creditAccounts, 1)}
        {!isEmpty(debitAccounts) && detailsList(debitAccounts, -1)}
      </>
    );
  };

  return (
    <Modal
      visible={true}
      title={t('account.card.stats')}
      onCancel={onOkClick}
      footer={
        <Button key="ok" type="default" onClick={onOkClick}>
          {t('generic.actions.ok')}
        </Button>
      }
    >
      <div className="account-stats-modal">
        <Select
          mode="multiple"
          placeholder={t('stats.selectAccountsPlaceholder')}
          value={state.selectedAccounts.map((account) => account.fullName)}
          onChange={onSelectedAccountsChange}
          style={{ width: '100%' }}
        >
          {filteredOptions.map((account: GqlFragmentAccount) => (
            <Select.Option
              key={`stats_all_accounts_selector_${account.id}`}
              value={account.id}
            >
              {account.fullName}
            </Select.Option>
          ))}
        </Select>
        {modalContent()}
      </div>
    </Modal>
  );
};

export default AccountStatsModal;
