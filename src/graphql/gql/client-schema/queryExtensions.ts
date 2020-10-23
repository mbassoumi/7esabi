/*
 extends the queries from the server schema by defining queries on the client side
 NOTE:: Remember to add the new queries to the typeDefs in schemaDefs.ts
 */
import { ApolloCache, gql } from '@apollo/client';
import { GQL_FRAGMENT_BASIC_USER_INFO } from './fragments';

export const GQL_USER_BY_ID = gql`
  query GqlUserById($id: String!) {
    userById(id: $id) @client {
      ...GqlFragmentBasicUserInfo
    }
  }

  ${GQL_FRAGMENT_BASIC_USER_INFO}
`;

// remember to add initial values if needed for the new queries that you extend on client
// ALSO, remember to add new queries to the typeDefs in schemaDefs.ts
export const initExtendedQueriesValues = (cache: ApolloCache<any>) => {
  cache.writeQuery({
    query: GQL_USER_BY_ID,
    data: {
      userById: null,
    },
  });
};
