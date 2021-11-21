import { API_SERVER } from '../utils/envVars';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './apiHelper';
import { Account } from '../@types/Account';
import { Currency } from '../@types/enums';

export interface AccountPermissionParams {
  user_id: number;
}

export interface AccountParams {
  name: string;
  currency: Currency;
  permissions: AccountPermissionParams[];
}

export const listAccountApi = async (accountGroupId: number) =>
  getRequest<Account[]>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts`
  );

export const getAccountApi = async (accountGroupId: number, id: number) =>
  getRequest<Account>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts/${id}`
  );

export const createAccountApi = async (
  accountGroupId: number,
  accountParams: AccountParams
) =>
  postRequest<Account>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts`,
    { account: accountParams }
  );

export const updateAccountApi = async (
  id: number,
  accountGroupId: number,
  accountParams: AccountParams
) =>
  putRequest<Account>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts/${id}`,
    { account: accountParams }
  );

export const deleteAccountApi = async (id: number, accountGroupId: number) =>
  deleteRequest(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts/${id}`
  );
