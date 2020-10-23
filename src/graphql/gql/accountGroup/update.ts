import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_UPDATE_ACCOUNT_GROUP = gql`
  mutation GqlUpdateAccountGroup($data: AccountGroupInput!) {
    updateAccountGroup(data: $data) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
