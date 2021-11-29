import { API_SERVER } from '../utils/envVars';
import { deleteRequest, postRequest, putRequest } from './apiHelper';
import { AccountTransactionType } from '../@types/enums';
import { AccountTransaction } from '../@types/AccountTransaction';

export interface AccountTransactionParams {
  transaction_type: AccountTransactionType;
  amount: number;
  description: string | null;
  date: string;
}

export const createTransactionApi = async (
  accountId: number,
  accountTransactionParams: AccountTransactionParams
) => {
  const apiResponse = await postRequest<AccountTransaction>(
    `${API_SERVER}/accounts/${accountId}/account_transactions`,
    { account_transaction: accountTransactionParams }
  );
  return apiResponse.data!;
};

export const updateTransactionApi = async (
  id: number,
  accountId: number,
  accountTransactionParams: AccountTransactionParams
) => {
  const apiResponse = await putRequest<AccountTransaction>(
    `${API_SERVER}/accounts/${accountId}/account_transactions/${id}`,
    { account_transaction: accountTransactionParams }
  );
  return apiResponse.data!;
};

export const deleteTransactionApi = async (id: number, accountId: number) =>
  deleteRequest(
    `${API_SERVER}/accounts/${accountId}/account_transactions/${id}`
  );
