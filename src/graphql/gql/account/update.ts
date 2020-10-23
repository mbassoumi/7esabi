import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_UPDATE_ACCOUNT = gql`
  mutation GqlUpdateAccount($data: AccountInput!) {
    updateAccount(data: $data) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
