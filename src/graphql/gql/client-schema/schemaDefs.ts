import { ApolloCache, gql, Resolvers } from '@apollo/client';
import { GqlFragmentAccount } from './types/GqlFragmentAccount';
import { isEmpty } from 'lodash';
import { GqlFragmentBasicUserInfo } from './types/GqlFragmentBasicUserInfo';

// defines the client schema, which would extend the server schema
export const clientTypeDefs = gql`
  extend type User {
    fullName: String!
    initials: String!
  }

  extend type Account {
    isShared: Boolean!
    fullName: String!
  }

  extend type Query {
    userById(id: String!): User
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Account: ResolverMap;
}

export const clientResolvers: AppResolvers = {
  Account: {
    isShared: (account: GqlFragmentAccount, _, { cache }): boolean => {
      return !isEmpty(account.permissions);
    },
    fullName: (account: GqlFragmentAccount, _, { cache }): string => {
      return `${account.accountGroup.name} - ${account.name}`;
    },
  },
  User: {
    fullName: (user: GqlFragmentBasicUserInfo, _, { cache }): string => {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    },
    initials: (user: GqlFragmentBasicUserInfo, _, { cache }): string => {
      return `${user.profile.firstName
        .toUpperCase()
        .charAt(0)} ${user.profile.lastName.toUpperCase().charAt(0)}`;
    },
  },
};
