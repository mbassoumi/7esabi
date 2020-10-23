import { gql } from '@apollo/client';

export const GQL_LOGOUT = gql`
  mutation GqlLogout {
    logout
  }
`;
