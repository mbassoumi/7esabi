import { AccountTransactionType } from './enums';

export interface AccountTransaction {
  id: number;
  transaction_type: AccountTransactionType;
  amount: number;
  description: string | null;
  date: string;
  user_id: number;
  account_id: number;
}
