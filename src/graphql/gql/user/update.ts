import { gql } from '@apollo/client';
import { GQL_FRAGMENT_CURRENT_USER } from '../client-schema/fragments';

export const GQL_UPDATE_USER_PROFILE = gql`
  mutation GqlUpdateUserProfile($data: UserProfileInput!) {
    updateUserProfile(data: $data) {
      ...GqlFragmentCurrentUser
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
`;
