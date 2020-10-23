import { gql } from '@apollo/client';

export const GQL_FRAGMENT_TRANSACTION = gql`
  fragment GqlFragmentTransaction on Transaction {
    __typename
    id
    type
    amount
    date
    description
    user {
      id
    }
    updatedAt
  }
`;

export const GQL_FRAGMENT_ACCOUNT = gql`
  fragment GqlFragmentAccount on Account {
    __typename
    id
    name
    amount
    currency
    transactionsCount
    isShared @client
    accountGroup {
      id
      user {
        id
      }
    }
    permissions {
      id
      canEdit
      user {
        id
      }
    }
    lastTransaction {
      ...GqlFragmentTransaction
    }
  }

  ${GQL_FRAGMENT_TRANSACTION}
`;

export const GQL_FRAGMENT_ACCOUNT_GROUP = gql`
  fragment GqlFragmentAccountGroup on AccountGroup {
    __typename
    id
    name
    accounts {
      ...GqlFragmentAccount
    }
  }

  ${GQL_FRAGMENT_ACCOUNT}
`;

export const GQL_FRAGMENT_BASIC_USER_INFO = gql`
  fragment GqlFragmentBasicUserInfo on User {
    __typename
    id
    fullName @client
    initials @client
    profile {
      firstName
      lastName
      email
      locale
    }
  }
`;

export const GQL_FRAGMENT_CURRENT_USER = gql`
  fragment GqlFragmentCurrentUser on User {
    __typename
    ...GqlFragmentBasicUserInfo
    accountGroups {
      ...GqlFragmentAccountGroup
    }
    accountPermissions {
      account {
        ...GqlFragmentAccount
      }
    }
  }

  ${GQL_FRAGMENT_ACCOUNT_GROUP}
  ${GQL_FRAGMENT_BASIC_USER_INFO}
`;
