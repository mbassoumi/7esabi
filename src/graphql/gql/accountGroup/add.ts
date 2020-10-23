import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_ADD_ACCOUNT_GROUP = gql`
  mutation GqlAddAccountGroup($data: AccountGroupInput!) {
    addAccountGroup(data: $data) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
