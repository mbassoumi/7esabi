import { AccountGroup } from '../@types/AccountGroup';
import { API_SERVER } from '../utils/envVars';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './apiHelper';

export interface AccountGroupParams {
  name: string;
}

export const listAccountGroupApi = async () =>
  getRequest<AccountGroup[]>(`${API_SERVER}/account_groups`);

export const createAccountGroupApi = async (
  accountGroupParams: AccountGroupParams
) =>
  postRequest<AccountGroup>(`${API_SERVER}/account_groups`, {
    account_group: accountGroupParams,
  });

export const updateAccountGroupApi = async (
  id: number,
  accountGroupParams: AccountGroupParams
) =>
  putRequest<AccountGroup>(`${API_SERVER}/account_groups/${id}`, {
    account_group: accountGroupParams,
  });

export const deleteAccountGroupApi = async (id: number) =>
  deleteRequest(`${API_SERVER}/account_groups/${id}`);
