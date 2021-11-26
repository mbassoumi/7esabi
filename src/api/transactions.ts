import { getRequest } from './apiHelper';
import { AccountTransaction } from '../@types/AccountTransaction';
import { API_SERVER } from '../utils/envVars';

export interface TransactionFilters {
  account_ids: number[];
  start_date?: string;
  end_date?: string;
}

export const listTransactionsApi = async (
  filters: TransactionFilters,
  page: number,
  pageSize: number
) => {
  const apiResponse = await getRequest<AccountTransaction[]>(
    `${API_SERVER}/transactions`,
    {
      ...filters,
      page,
      items: pageSize,
    }
  );
  return apiResponse!;
};
