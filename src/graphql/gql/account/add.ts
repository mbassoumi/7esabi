import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_ADD_ACCOUNT = gql`
  mutation GqlAddAccount($data: AccountInput!) {
    addAccount(data: $data) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
