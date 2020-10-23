import { gql } from '@apollo/client';

export const GQL_ACCOUNT_STATS = gql`
  query GqlAccountStats($accountId: ID!) {
    accountStats(accountId: $accountId) {
      userId
      amount
    }
  }
`;
