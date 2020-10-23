import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation GqlLogin($code: String!) {
    login(code: $code) {
      success
    }
  }
`;
