import { User } from '../@types/User';
import { Account } from '../@types/Account';
import { pick } from 'lodash';
import { AccountParams, AccountPermissionParams } from '../api/account';
import { Currency } from '../@types/enums';
import { AccountPermission } from '../@types/AccountPermission';
import { format, parseISO } from 'date-fns';
import { message } from 'antd';
import { TFunction } from 'i18next';

export const userFullName = (user: User) =>
  `${user.first_name} ${user.last_name}`;

export const userInitials = (user: User) =>
  `${user.first_name[0]}${user.last_name[0]}`;

export const accountFullName = (account: Account) =>
  `${account.account_group.name} - ${account.name}`;

export const convertDateToApiDateString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const convertApiDateStringToDate = (dateString: string): Date => {
  // date string coming from the rails api is by default in the 'yyyy-MM-dd' format
  return parseISO(dateString);
};

export const convertApiDateStringToDisplayString = (
  dateString: string
): string => {
  // date string coming from the rails api is by default in the 'yyyy-MM-dd' format
  return dateString.replaceAll('-', '/');
};

export const showGenericOperationFailedMessage = (error: any, t: TFunction) => {
  message.error(t('generic.errors.operationFailed'));
};

export const initAccountPermissionParams = (
  accountPermission: AccountPermission
): AccountPermissionParams => ({ user_id: accountPermission.user_id });

export const initAccountPermissionParamsList = (
  accountPermissions: AccountPermission[]
): AccountPermissionParams[] =>
  accountPermissions.map((accountPermission) =>
    initAccountPermissionParams(accountPermission)
  ) || [];

export const initAccountParams = (account?: Account): AccountParams => {
  if (account) {
    return {
      ...pick(account, ['name', 'currency']),
      permissions: initAccountPermissionParamsList(account.permissions),
    };
  }

  return { currency: Currency.USD, permissions: [] } as any;
};

// export const initAccountPermissionsList = (account?: Account): AccountPermission[] => {
//   if(!account?.permissions) {
//     return [];
//   }
//
//   return account.permissions.map((permission))
// }
