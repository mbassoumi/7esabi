import { gql } from '@apollo/client';
import { GQL_FRAGMENT_ACCOUNT } from '../client-schema/fragments';

export const GQL_ADD_TRANSACTION = gql`
  mutation GqlAddTransaction($data: TransactionInput!) {
    addTransaction(data: $data) {
      ...GqlFragmentAccount
    }
  }
  ${GQL_FRAGMENT_ACCOUNT}
`;
