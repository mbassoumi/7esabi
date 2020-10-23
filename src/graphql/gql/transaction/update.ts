import { gql } from '@apollo/client';
import { GQL_FRAGMENT_ACCOUNT } from '../client-schema/fragments';

export const GQL_UPDATE_TRANSACTION = gql`
  mutation GqlUpdateTransaction($data: TransactionInput!) {
    updateTransaction(data: $data) {
      ...GqlFragmentAccount
    }
  }
  ${GQL_FRAGMENT_ACCOUNT}
`;
