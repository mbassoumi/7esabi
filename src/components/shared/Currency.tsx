import {
  faDollarSign,
  faEuroSign,
  faShekelSign,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Currency } from '../../graphql/gql/globalTypes';

interface CurrencyIconProps {
  currencyType: Currency;
}
const CurrencyIcon = ({ currencyType }: CurrencyIconProps) => {
  switch (currencyType) {
    case Currency.NIS:
      return <FontAwesomeIcon icon={faShekelSign} />;
    case Currency.USD:
      return <FontAwesomeIcon icon={faDollarSign} />;
    case Currency.EURO:
      return <FontAwesomeIcon icon={faEuroSign} />;
    default:
      return (
        <span>
          <b>{currencyType}</b>
        </span>
      );
  }
};

export default CurrencyIcon;
