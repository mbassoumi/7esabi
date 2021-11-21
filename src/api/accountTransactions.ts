import { API_SERVER } from '../utils/envVars';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './apiHelper';
import { AccountTransactionType } from '../@types/enums';
import { AccountTransaction } from '../@types/AccountTransaction';

export interface AccountTransactionParams {
  transaction_type: AccountTransactionType;
  amount: number;
  description: string | null;
  date: string;
}

export const listTransactionsApi = async (
  accountId: number,
  page: number,
  pageSize: number
) =>
  getRequest<AccountTransaction[]>(
    `${API_SERVER}/accounts/${accountId}/account_transactions`,
    { page, items: pageSize }
  );

export const createTransactionApi = async (
  accountId: number,
  accountTransactionParams: AccountTransactionParams
) =>
  postRequest<AccountTransaction>(
    `${API_SERVER}/accounts/${accountId}/account_transactions`,
    { account_transaction: accountTransactionParams }
  );

export const updateTransactionApi = async (
  id: number,
  accountId: number,
  accountTransactionParams: AccountTransactionParams
) =>
  putRequest<AccountTransaction>(
    `${API_SERVER}/accounts/${accountId}/account_transactions/${id}`,
    { account_transaction: accountTransactionParams }
  );

export const deleteTransactionApi = async (id: number, accountId: number) =>
  deleteRequest(
    `${API_SERVER}/accounts/${accountId}/account_transactions/${id}`
  );
