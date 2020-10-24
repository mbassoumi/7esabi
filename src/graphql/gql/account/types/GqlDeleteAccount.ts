/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlDeleteAccount
// ====================================================

export interface GqlDeleteAccount_deleteAccount_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlDeleteAccount_deleteAccount_accountGroups_accounts_accountGroup_user;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlDeleteAccount_deleteAccount_accountGroups_accounts_permissions_user;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlDeleteAccount_deleteAccount_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlDeleteAccount_deleteAccount_accountGroups_accounts_accountGroup;
  permissions: GqlDeleteAccount_deleteAccount_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlDeleteAccount_deleteAccount_accountGroups_accounts_lastTransaction | null;
}

export interface GqlDeleteAccount_deleteAccount_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlDeleteAccount_deleteAccount_accountGroups_accounts[] | null;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlDeleteAccount_deleteAccount_accountPermissions_account_accountGroup_user;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlDeleteAccount_deleteAccount_accountPermissions_account_permissions_user;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlDeleteAccount_deleteAccount_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlDeleteAccount_deleteAccount_accountPermissions_account_accountGroup;
  permissions: GqlDeleteAccount_deleteAccount_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlDeleteAccount_deleteAccount_accountPermissions_account_lastTransaction | null;
}

export interface GqlDeleteAccount_deleteAccount_accountPermissions {
  __typename: "AccountPermission";
  account: GqlDeleteAccount_deleteAccount_accountPermissions_account;
}

export interface GqlDeleteAccount_deleteAccount {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlDeleteAccount_deleteAccount_profile;
  accountGroups: GqlDeleteAccount_deleteAccount_accountGroups[] | null;
  accountPermissions: GqlDeleteAccount_deleteAccount_accountPermissions[] | null;
}

export interface GqlDeleteAccount {
  deleteAccount: GqlDeleteAccount_deleteAccount | null;
}

export interface GqlDeleteAccountVariables {
  id: string;
}
