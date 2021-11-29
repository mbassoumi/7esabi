import { Account } from './Account';

export interface AccountGroup {
  id: number;
  name: string;
  user_id: number;
  accounts?: Account[];
}
