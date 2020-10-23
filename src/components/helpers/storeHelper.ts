import { MissingFieldError, useApolloClient } from '@apollo/client';
import { isEmpty, find } from 'lodash';
import { SESSION_DATA_QUERY } from '../../graphql/gql/auth/sessionData';
import { GqlSessionDataQuery } from '../../graphql/gql/auth/types/GqlSessionDataQuery';
import {
  GQL_FRAGMENT_ACCOUNT,
  GQL_FRAGMENT_ACCOUNT_GROUP,
  GQL_FRAGMENT_BASIC_USER_INFO,
} from '../../graphql/gql/client-schema/fragments';
import { GqlFragmentAccount } from '../../graphql/gql/client-schema/types/GqlFragmentAccount';
import { GqlFragmentAccountGroup } from '../../graphql/gql/client-schema/types/GqlFragmentAccountGroup';
import { GqlFragmentBasicUserInfo } from '../../graphql/gql/client-schema/types/GqlFragmentBasicUserInfo';
import { useLocation } from 'react-router-dom';

export function useQueryParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export function useCurrentUser() {
  const gqlClient = useApolloClient();
  try {
    return gqlClient.cache.readQuery<GqlSessionDataQuery>({
      query: SESSION_DATA_QUERY,
    })?.sessionData?.user;
  } catch (e) {
    return null;
  }
}

export function useAllUsers() {
  const gqlClient = useApolloClient();
  return gqlClient.cache.readQuery<GqlSessionDataQuery>({
    query: SESSION_DATA_QUERY,
  })?.sessionData?.allUsers;
}

export function useAccountGroup(id: string | null) {
  try {
    return useCachedEntity<GqlFragmentAccountGroup>(
      isEmpty(id) ? 'unknown_random_group_id' : `AccountGroup:${id}`,
      GQL_FRAGMENT_ACCOUNT_GROUP,
      'GqlFragmentAccountGroup'
    );
  } catch (error) {
    if (error instanceof MissingFieldError) {
      // expected case, if the account is external.
      return null;
    }
    throw error;
  }
}

export function useAccount(id: string) {
  return useCachedEntity<GqlFragmentAccount>(
    `Account:${id}`,
    GQL_FRAGMENT_ACCOUNT,
    'GqlFragmentAccount'
  );
}

export function useAccountPermission(accountId: string, userId?: string) {
  const account = useAccount(accountId);
  const currentUser = useCurrentUser();
  let targetUserId = userId ? userId : currentUser!.id;
  for (const accountPermission of account?.permissions || []) {
    if (accountPermission.user.id == targetUserId) {
      return accountPermission;
    }
  }
  return null;
}

export function useBasicUserInfo(userId: string) {
  return useCachedEntity<GqlFragmentBasicUserInfo>(
    `User:${userId}`,
    GQL_FRAGMENT_BASIC_USER_INFO
  );
}

export function useCachedEntity<T>(
  cacheId: string,
  fragment: any,
  fragmentName?: string
) {
  const gqlClient = useApolloClient();
  const args = { id: cacheId, fragment } as any;
  if (!isEmpty(fragmentName)) {
    args['fragmentName'] = fragmentName;
  }
  return gqlClient.readFragment<T>(args);
}
