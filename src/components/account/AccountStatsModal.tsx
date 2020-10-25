import { Alert, Button, Modal, Select } from 'antd';
import axios from 'axios';
import { concat, flatten, isEmpty, reverse, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'react-minimal-pie-chart';
import { GqlSessionDataQuery_sessionData_user } from '../../graphql/gql/auth/types/GqlSessionDataQuery';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { Currency } from '../../graphql/gql/globalTypes';
import { useCurrentUser } from '../helpers/storeHelper';
import CurrencySelector from '../shared/currencySelector';
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
  selectedCurrency: Currency;
  accountConversions: any;
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

const currencyFormalCode = (currency: Currency) => {
  if (currency == Currency.USD || currency == Currency.JOD) return currency;

  if (currency == Currency.NIS) return 'ILS';

  return 'EUR';
};

const AccountStatsModal = ({ onOk }: AccountStatsModalProps) => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser()!;
  const allAccounts = extractAllAccounts(currentUser);

  const [state, setState] = useState({
    selectedAccounts: [],
    selectedCurrency: Currency.USD,
    accountConversions: {},
  } as AccountStatsModalState);

  useEffect(() => {
    updateAccountConversions();
  }, [state.selectedAccounts, state.selectedCurrency]);

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

  const onCurrencySelectChange = (selectValue: string) => {
    setState((state: any) => ({
      ...state,
      selectedCurrency: (Currency as any)[selectValue],
    }));
  };

  const updateAccountConversions = () => {
    for (let account of state.selectedAccounts! || []) {
      if (account.currency == state.selectedCurrency || account.amount == 0)
        continue;

      const convertedAmount = getConvertedAmount(account);
      if (!convertedAmount) {
        const srcCurrency = currencyFormalCode(account.currency);
        const destCurrency = currencyFormalCode(state.selectedCurrency);
        const queryParam = `${srcCurrency}_${destCurrency}`;
        axios
          .get(
            `https://free.currconv.com/api/v7/convert?q=${queryParam}&compact=ultra&apiKey=315c78b4ac4bec821a28`
          )
          .then((res) => {
            const convertedAmount = (res.data && res.data[queryParam]) || -1;
            updateSelectedAccountAmount(account, destCurrency, convertedAmount);
          });
      }
    }
  };

  const updateSelectedAccountAmount = (
    account: any,
    currencyCode: string,
    amount: number
  ) => {
    setState((state) => {
      const accountConversions = state.accountConversions || {};
      const targetAccount = accountConversions[account.id];
      if (targetAccount) {
        targetAccount.conversions[currencyCode] = amount;
      } else {
        accountConversions[account.id] = {
          conversions: { [currencyCode]: amount },
        };
      }
      return { ...state, accountConversions: { ...accountConversions } };
    });
  };

  const getConvertedAmount = (account: any) => {
    const convertedAccount =
      state.accountConversions[account.id] || ({ conversions: {} } as any);
    return convertedAccount.conversions[
      currencyFormalCode(state.selectedCurrency)
    ];
  };

  const creditAccounts: GqlFragmentAccount[] = [];
  const debitAccounts: GqlFragmentAccount[] = [];
  let chartData: any = [];

  const onOkClick = async (event: any) => {
    event.stopPropagation();
    onOk();
  };

  const renderCustomizedLabel = ({ dataEntry, dx, dy }: any) => {
    let name = dataEntry.title;
    if (name.length > 80) {
      name = name.substring(0, 80) + '...';
    }
    const percentage = `${dataEntry.percentage.toFixed(0)}%`;
    const label = `${percentage} ${name}`;

    if (dx < 0) {
      return `${name.charAt(0)} ${label}`;
    }
    return label;
  };

  const pieChart = () => {
    return (
      <div className="account-stats-modal__chart">
        <PieChart
          animate
          data={chartData || []}
          label={renderCustomizedLabel}
          radius={38}
          labelPosition={100}
          segmentsShift={1}
          labelStyle={{ fontSize: '6px' }}
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
          {reverse(sortBy(dataList, ['amount'])).map((account) => {
            const convertedAmount =
              account.currency == state.selectedCurrency
                ? ''
                : `- (${Number(
                    getConvertedAmount(account) || 0
                  ).toLocaleString()} ${t(
                    `account.currency.${state.selectedCurrency}`
                  )})`;
            return (
              <li key={account.id}>
                {`${account.fullName}: (${Number(
                  account.amount
                ).toLocaleString()} ${t(
                  `account.currency.${account.currency}`
                )}) ${convertedAmount}`}
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
      const convertedAmount = getConvertedAmount(account) || account.amount;
      if (convertedAmount >= 0) {
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
        {!isEmpty(chartData) && (
          <div className="account-stats-modal__total-amount">
            {`${t('stats.totalAmount')}: ${Number(
              totalCreditAmounts || 0
            ).toLocaleString()} ${t(
              `account.currency.${state.selectedCurrency}`
            )}`}
          </div>
        )}
        {!isEmpty(creditAccounts) && detailsList(creditAccounts, 1)}
        {!isEmpty(debitAccounts) && detailsList(debitAccounts, -1)}
      </>
    );
  };

  const filteredOptions = allAccounts.filter(
    (account) => !state.selectedAccounts.includes(account! as any)
  ) as any;

  return (
    <Modal
      visible={true}
      width="750px"
      maskClosable={false}
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
        <CurrencySelector
          selectedCurrency={state.selectedCurrency}
          onCurrencySelectChange={onCurrencySelectChange}
          selectSize="middle"
        />
        <div className="account-stats-modal__container">{modalContent()}</div>
      </div>
    </Modal>
  );
};

export default AccountStatsModal;
