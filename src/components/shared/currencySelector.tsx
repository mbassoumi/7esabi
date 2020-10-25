import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../graphql/gql/globalTypes';
import CurrencyIcon from './Currency';
import './styles/currencySelector.scss';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencySelectChange: (currency: Currency) => any;
  selectSize?: 'small' | 'middle' | 'large';
}

const CurrencySelector = ({
  selectedCurrency,
  onCurrencySelectChange,
  selectSize = 'large',
}: CurrencySelectorProps) => {
  const { t } = useTranslation();

  return (
    <Select
      size={selectSize}
      value={selectedCurrency}
      onChange={onCurrencySelectChange}
      placeholder={t('account.form.selectCurrency')}
      className="currency-selector"
    >
      {Object.keys(Currency).map((key: string) => (
        <Select.Option key={key} value={key}>
          <span>
            <CurrencyIcon currencyType={key as Currency} />
          </span>
          <span className="currency-selector__option">
            {t(`account.currency.${key}`)}
          </span>
        </Select.Option>
      ))}
    </Select>
  );
};

export default CurrencySelector;
