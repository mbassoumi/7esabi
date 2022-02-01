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
  archived: boolean;
}

export const listAccountGroupApi = async () => {
  const apiResponse = await getRequest<AccountGroup[]>(
    `${API_SERVER}/account_groups`
  );
  return apiResponse.data!;
};

export const createAccountGroupApi = async (
  accountGroupParams: AccountGroupParams
) => {
  const apiResponse = await postRequest<AccountGroup>(
    `${API_SERVER}/account_groups`,
    {
      account_group: accountGroupParams,
    }
  );
  return apiResponse.data!;
};

export const updateAccountGroupApi = async (
  id: number,
  accountGroupParams: AccountGroupParams
) => {
  const apiResponse = await putRequest<AccountGroup>(
    `${API_SERVER}/account_groups/${id}`,
    {
      account_group: accountGroupParams,
    }
  );
  return apiResponse.data!;
};

export const deleteAccountGroupApi = async (id: number) =>
  deleteRequest(`${API_SERVER}/account_groups/${id}`);
