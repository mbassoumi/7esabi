import { useQuery } from '@apollo/client';
import { Alert, Button, Modal, Spin } from 'antd';
import { find, isEmpty } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'react-minimal-pie-chart';
import { GQL_ACCOUNT_STATS } from '../../graphql/gql/account/getStats';
import {
  GqlAccountStats,
  GqlAccountStats_accountStats,
} from '../../graphql/gql/account/types/GqlAccountStats';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { TransactionType } from '../../graphql/gql/globalTypes';
import { useAllUsers, useCurrentUser } from '../helpers/storeHelper';
import './styles/accountStatsModal.scss';

interface AccountStatsModalProps {
  account: GqlFragmentAccount;
  onOk: () => any;
}

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

const AccountStatsModal = ({ account, onOk }: AccountStatsModalProps) => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const allUsers = useAllUsers();

  const { loading, error, data } = useQuery<GqlAccountStats>(
    GQL_ACCOUNT_STATS,
    { variables: { accountId: account.id } }
  );

  const onOkClick = async (event: any) => {
    event.stopPropagation();
    onOk();
  };

  const creditStats: GqlAccountStats_accountStats[] = [];
  const debitStats: GqlAccountStats_accountStats[] = [];

  const renderCustomizedLabel = ({ dataEntry }: any) => {
    const name = dataEntry.title;
    const percentage = `${dataEntry.percentage.toFixed(0)}%`;
    return `${name} ${percentage}`;
  };

  const getUserNameForChart = (userId: string) => {
    if (userId == currentUser!.id) {
      return t('user.you');
    }
    const user = find(allUsers, { id: userId })!;
    return `${user.profile.firstName} ${user.profile.lastName.charAt(0)}`;
  };

  const pieChart = () => {
    const data: any = creditStats.map((accountStat, index) => ({
      title: getUserNameForChart(accountStat.userId),
      value: accountStat.amount,
      color: COLORS[index % COLORS.length],
    }));

    return (
      <div className="account-stats-modal__chart">
        <PieChart
          animate
          data={data || []}
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

  const detailsList = (
    dataList: GqlAccountStats_accountStats[],
    type: TransactionType
  ) => {
    return (
      <div className="account-stats-modal__details-list">
        <div>
          {type == TransactionType.CREDIT
            ? t('account.card.participation')
            : t('account.card.debits')}
          :
        </div>
        <ul>
          {dataList.map((accountStat) => {
            return (
              <li key={accountStat.userId}>
                {`${getUserNameForChart(accountStat.userId)}: ${Number(
                  accountStat.amount
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
    if (loading)
      return (
        <div className="account-stats-modal__loading">
          <Spin size={'default'} />
        </div>
      );

    if (error)
      return (
        <Alert message={t('generic.errors.operationFailed')} type={'error'} />
      );

    for (let accountStat of data!.accountStats || []) {
      accountStat.amount < 0
        ? debitStats.push(accountStat)
        : creditStats.push(accountStat);
    }

    if (isEmpty(creditStats) && isEmpty(debitStats)) {
      return (
        <Alert message={t('generic.messages.noDataFound')} type={'info'} />
      );
    }

    return (
      <>
        {!isEmpty(creditStats) && pieChart()}
        {!isEmpty(creditStats) &&
          detailsList(creditStats, TransactionType.CREDIT)}
        {!isEmpty(debitStats) && detailsList(debitStats, TransactionType.DEBIT)}
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
      <div className="account-stats-modal">{modalContent()}</div>
    </Modal>
  );
};

export default AccountStatsModal;
