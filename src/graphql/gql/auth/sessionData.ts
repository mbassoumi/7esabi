import { gql } from '@apollo/client';
import {
  GQL_FRAGMENT_BASIC_USER_INFO,
  GQL_FRAGMENT_CURRENT_USER,
  GQL_FRAGMENT_TRANSACTION,
} from '../client-schema/fragments';

export const SESSION_DATA_QUERY = gql`
  query GqlSessionDataQuery {
    sessionData {
      user {
        ...GqlFragmentCurrentUser
      }
      allUsers {
        ...GqlFragmentBasicUserInfo
      }
    }
  }
  ${GQL_FRAGMENT_CURRENT_USER}
  ${GQL_FRAGMENT_BASIC_USER_INFO}
  ${GQL_FRAGMENT_TRANSACTION}
`;
