import { AccountTransaction } from './AccountTransaction';
import { AccountPermission } from './AccountPermission';
import { Currency } from './enums';
import { AccountGroup } from './AccountGroup';

export interface Account {
  id: number;
  name: string;
  balance: number;
  currency: Currency;
  account_group: AccountGroup;
  permissions: AccountPermission[];
  last_transaction: AccountTransaction | null;
  total_transactions_count: number;
}
