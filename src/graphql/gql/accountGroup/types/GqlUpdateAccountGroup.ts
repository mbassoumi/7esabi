/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountGroupInput, LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlUpdateAccountGroup
// ====================================================

export interface GqlUpdateAccountGroup_updateAccountGroup_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_accountGroup_user;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_permissions_user;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_accountGroup;
  permissions: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts_lastTransaction | null;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlUpdateAccountGroup_updateAccountGroup_accountGroups_accounts[] | null;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_accountGroup_user;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_permissions_user;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_accountGroup;
  permissions: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account_lastTransaction | null;
}

export interface GqlUpdateAccountGroup_updateAccountGroup_accountPermissions {
  __typename: "AccountPermission";
  account: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions_account;
}

export interface GqlUpdateAccountGroup_updateAccountGroup {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlUpdateAccountGroup_updateAccountGroup_profile;
  accountGroups: GqlUpdateAccountGroup_updateAccountGroup_accountGroups[] | null;
  accountPermissions: GqlUpdateAccountGroup_updateAccountGroup_accountPermissions[] | null;
}

export interface GqlUpdateAccountGroup {
  updateAccountGroup: GqlUpdateAccountGroup_updateAccountGroup | null;
}

export interface GqlUpdateAccountGroupVariables {
  data: AccountGroupInput;
}
