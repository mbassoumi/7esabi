import { gql } from '@apollo/client';
import { GQL_FRAGMENT_ACCOUNT } from '../client-schema/fragments';

export const GQL_DELETE_TRANSACTION = gql`
  mutation GqlDeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      ...GqlFragmentAccount
    }
  }
  ${GQL_FRAGMENT_ACCOUNT}
`;
