import { useLocation } from 'react-router-dom';
import { User } from '../../@types/User';
import { AccountGroup } from '../../@types/AccountGroup';
import { find } from 'lodash';
import { queryClient } from '../../queryClient';

export function useQueryParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

/*
 * Query Keys
 */

export const queryKeyForCurrentUser = () => ['currentUser'];
export const queryKeyForAllUsers = () => ['allUsers'];
export const queryKeyForAccountGroupsList = () => ['accountGroups'];
export const queryKeyForAccount = (id: number) => ['account', id];
export const queryKeyForAccountTransactionsList = (accountId: number) =>
  // nested under account queryKey so that it can be refreshed whenever the account is refresh
  queryKeyForAccount(accountId).concat(['transactions']);

/*
 * User helpers
 */

export const getCachedCurrentUser = () =>
  queryClient.getQueryData<User>(queryKeyForCurrentUser())!;

export const getCachedAllUsers = () =>
  queryClient.getQueryData<User[]>(queryKeyForAllUsers());

export const getCachedUserInfo = (userId: number) => {
  const allUsers = getCachedAllUsers();
  return find(allUsers, (user) => user.id === userId);
};

/*
 * AccountGroup helpers
 */
export const getCachedAccountGroups = () =>
  queryClient.getQueryData<AccountGroup[]>(queryKeyForAccountGroupsList());

export const refreshAccountGroups = async () =>
  queryClient.invalidateQueries(queryKeyForAccountGroupsList());

/*
 * Account helpers
 */

export const refreshAccount = async (id: number) =>
  queryClient.invalidateQueries(queryKeyForAccount(id));
