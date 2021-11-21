import { Alert, Button, Modal, Select } from 'antd';
import axios from 'axios';
import { flatten, isEmpty, reverse, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart } from 'react-minimal-pie-chart';
import './styles/accountStatsModal.scss';
import { Account } from '../../@types/Account';
import { Currency } from '../../@types/enums';
import { AccountGroup } from '../../@types/AccountGroup';
import { getCachedAccountGroups } from '../helpers/storeHelper';
import { accountFullName } from '../../utils/helpers';
import CurrencySelector from '../shared/CurrencySelector';

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
  selectedAccounts: Account[];
  selectedCurrency: Currency;
  accountConversions: Record<number, { conversions: any }>;
  conversionApiIsDown: boolean;
}

const extractAllAccounts = (accountGroups: AccountGroup[]) =>
  flatten(accountGroups?.map((accountGroup) => accountGroup.accounts) || []);

const currencyFormalCode = (currency: Currency) => {
  if (currency == Currency.USD || currency == Currency.JOD) return currency;

  if (currency == Currency.NIS) return 'ILS';

  return 'EUR';
};

const AccountStatsModal = ({ onOk }: AccountStatsModalProps) => {
  const { t } = useTranslation();
  const accountGroups = getCachedAccountGroups()!;
  const allAccounts = extractAllAccounts(accountGroups);

  const [state, setState] = useState<AccountStatsModalState>({
    selectedAccounts: [],
    selectedCurrency: Currency.USD,
    accountConversions: {},
    conversionApiIsDown: false,
  });

  useEffect(() => {
    updateAccountConversions();
  }, [state.selectedAccounts, state.selectedCurrency]);

  const onSelectedAccountsChange = (
    selectedAccountIdsOrNames: (string | number)[]
  ) => {
    setState((state) => ({
      ...state,
      selectedAccounts: allAccounts.filter(
        (account) =>
          selectedAccountIdsOrNames.includes(account!.id) ||
          selectedAccountIdsOrNames.includes(accountFullName(account!))
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
    for (const account of state.selectedAccounts || []) {
      if (account.currency == state.selectedCurrency || account.balance == 0)
        continue;

      const convertedAmount = getConvertedBalance(account);
      if (!convertedAmount) {
        const srcCurrency = currencyFormalCode(account.currency);
        const destCurrency = currencyFormalCode(state.selectedCurrency);
        const queryParam = `${srcCurrency}_${destCurrency}`;
        axios
          .get(
            `https://free.currconv.com/api/v7/convert?q=${queryParam}&compact=ultra&apiKey=315c78b4ac4bec821a28`
          )
          .then((res) => {
            const conversionRatio = res.data && res.data[queryParam];
            const convertedAmount = conversionRatio
              ? account.balance * conversionRatio
              : -1;
            updateSelectedAccountBalance(
              account,
              destCurrency,
              convertedAmount
            );
          })
          .catch((error) => {
            console.log(error);
            setState((state) => ({
              ...state,
              conversionApiIsDown: true,
            }));
          });
      }
    }
  };

  const updateSelectedAccountBalance = (
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
      return {
        ...state,
        accountConversions: { ...accountConversions },
        conversionApiIsDown: false,
      };
    });
  };

  const getConvertedBalance = (account: any) => {
    const convertedAccount = state.accountConversions[account.id] || {
      conversions: {},
    };
    return convertedAccount.conversions[
      currencyFormalCode(state.selectedCurrency)
    ];
  };

  const creditAccounts: Account[] = [];
  const debitAccounts: Account[] = [];
  const chartData: any = [];

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

  const detailsList = (dataList: Account[], balance: number) => {
    return (
      <div className="account-stats-modal__details-list">
        <div>
          {balance >= 0
            ? t('account.card.participation')
            : t('account.card.debits')}
          :
        </div>
        <ul>
          {reverse(sortBy(dataList, ['balance'])).map((account) => {
            const convertedAmount =
              account.currency == state.selectedCurrency
                ? ''
                : `- (${Number(
                    getConvertedBalance(account) || 0
                  ).toLocaleString()} ${t(
                    `account.currency.${state.selectedCurrency}`
                  )})`;
            return (
              <li key={account.id}>
                {`${accountFullName(account)}: (${Number(
                  account.balance
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
    for (const account of state.selectedAccounts! || []) {
      const convertedAmount = getConvertedBalance(account) || account.balance;
      if (convertedAmount >= 0) {
        totalCreditAmounts = totalCreditAmounts + convertedAmount;
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
    for (const account of creditAccounts) {
      const convertedAmount = getConvertedBalance(account) || account.balance;
      if (convertedAmount! >= significantAmountThreshold) {
        chartData.push({
          title: accountFullName(account),
          value: convertedAmount,
          color: COLORS[index % COLORS.length],
        });
        index = index + 1;
      } else {
        insignificantAmounts = insignificantAmounts + convertedAmount;
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
        {state.conversionApiIsDown && (
          <Alert message={t('stats.conversionApiIsDown')} type={'error'} />
        )}
        <Select
          mode="multiple"
          placeholder={t('stats.selectAccountsPlaceholder')}
          value={state.selectedAccounts.map((account) =>
            accountFullName(account)
          )}
          onChange={onSelectedAccountsChange}
          style={{ width: '100%' }}
        >
          {filteredOptions.map((account: Account) => (
            <Select.Option
              key={`stats_all_accounts_selector_${account.id}`}
              value={account.id}
            >
              {accountFullName(account)}
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
