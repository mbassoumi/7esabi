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
  archived: boolean;
  permissions: AccountPermissionParams[];
}

export const listAccountApi = async (accountGroupId: number) => {
  const apiResponse = await getRequest<Account[]>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts`
  );
  return apiResponse.data!;
};

export const getAccountApi = async (accountGroupId: number, id: number) => {
  const apiResponse = await getRequest<Account>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts/${id}`
  );
  return apiResponse.data!;
};

export const createAccountApi = async (
  accountGroupId: number,
  accountParams: AccountParams
) => {
  const apiResponse = await postRequest<Account>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts`,
    { account: accountParams }
  );
  return apiResponse.data!;
};

export const updateAccountApi = async (
  id: number,
  accountGroupId: number,
  accountParams: AccountParams
) => {
  const apiResponse = await putRequest<Account>(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts/${id}`,
    { account: accountParams }
  );
  return apiResponse.data!;
};

export const deleteAccountApi = async (id: number, accountGroupId: number) =>
  deleteRequest(
    `${API_SERVER}/account_groups/${accountGroupId}/accounts/${id}`
  );
