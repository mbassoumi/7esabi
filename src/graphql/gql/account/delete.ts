import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_DELETE_ACCOUNT = gql`
  mutation GqlDeleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
