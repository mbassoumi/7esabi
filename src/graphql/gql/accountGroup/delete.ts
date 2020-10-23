import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_DELETE_ACCOUNT_GROUP = gql`
  mutation GqlDeleteAccountGroup($id: ID!) {
    deleteAccountGroup(id: $id) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
