/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountGroupInput, LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlAddAccountGroup
// ====================================================

export interface GqlAddAccountGroup_addAccountGroup_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_accountGroup_user;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_permissions_user;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_accountGroup;
  permissions: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts_lastTransaction | null;
}

export interface GqlAddAccountGroup_addAccountGroup_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlAddAccountGroup_addAccountGroup_accountGroups_accounts[] | null;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlAddAccountGroup_addAccountGroup_accountPermissions_account_accountGroup_user;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlAddAccountGroup_addAccountGroup_accountPermissions_account_permissions_user;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlAddAccountGroup_addAccountGroup_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlAddAccountGroup_addAccountGroup_accountPermissions_account_accountGroup;
  permissions: GqlAddAccountGroup_addAccountGroup_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlAddAccountGroup_addAccountGroup_accountPermissions_account_lastTransaction | null;
}

export interface GqlAddAccountGroup_addAccountGroup_accountPermissions {
  __typename: "AccountPermission";
  account: GqlAddAccountGroup_addAccountGroup_accountPermissions_account;
}

export interface GqlAddAccountGroup_addAccountGroup {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlAddAccountGroup_addAccountGroup_profile;
  accountGroups: GqlAddAccountGroup_addAccountGroup_accountGroups[] | null;
  accountPermissions: GqlAddAccountGroup_addAccountGroup_accountPermissions[] | null;
}

export interface GqlAddAccountGroup {
  addAccountGroup: GqlAddAccountGroup_addAccountGroup | null;
}

export interface GqlAddAccountGroupVariables {
  data: AccountGroupInput;
}
