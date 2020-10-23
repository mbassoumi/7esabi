import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_URL } from '../utils/envVars';
import { initExtendedQueriesValues } from './gql/client-schema/queryExtensions';
import {
  clientResolvers,
  clientTypeDefs,
} from './gql/client-schema/schemaDefs';
import { paginationWithNoCache } from './utils/paginationHelpers';

// to send cookie with the requests
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let error of graphQLErrors) {
      const { message, locations, path } = error;
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
  return;
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        transactions: paginationWithNoCache(),
      },
    },
  },
});

export const graphqlClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
  {
    cache: cache,
    link: from([errorLink, httpLink]),
    typeDefs: clientTypeDefs,
    resolvers: clientResolvers,
  }
);
// initialize extended queries (write their defaults to cache)
initExtendedQueriesValues(cache);
