import { gql } from '@apollo/client';
import { GQL_FRAGMENT_TRANSACTION } from '../client-schema/fragments';

export const GQL_TRANSACTIONS_PAGINATED = gql`
  query GqlTransactionsPaginated(
    $accountId: ID!
    $skip: Int = 0
    $take: Int = 10
  ) {
    transactions(accountId: $accountId, skip: $skip, take: $take)
      @connection(key: "transactions", filter: ["accountId"]) {
      ...GqlFragmentTransaction
    }
  }
  ${GQL_FRAGMENT_TRANSACTION}
`;
