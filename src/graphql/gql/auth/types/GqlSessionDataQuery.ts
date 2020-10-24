/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL query operation: GqlSessionDataQuery
// ====================================================

export interface GqlSessionDataQuery_sessionData_user_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlSessionDataQuery_sessionData_user_accountGroups_accounts_accountGroup_user;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlSessionDataQuery_sessionData_user_accountGroups_accounts_permissions_user;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlSessionDataQuery_sessionData_user_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlSessionDataQuery_sessionData_user_accountGroups_accounts_accountGroup;
  permissions: GqlSessionDataQuery_sessionData_user_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlSessionDataQuery_sessionData_user_accountGroups_accounts_lastTransaction | null;
}

export interface GqlSessionDataQuery_sessionData_user_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlSessionDataQuery_sessionData_user_accountGroups_accounts[] | null;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlSessionDataQuery_sessionData_user_accountPermissions_account_accountGroup_user;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlSessionDataQuery_sessionData_user_accountPermissions_account_permissions_user;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlSessionDataQuery_sessionData_user_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlSessionDataQuery_sessionData_user_accountPermissions_account_accountGroup;
  permissions: GqlSessionDataQuery_sessionData_user_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlSessionDataQuery_sessionData_user_accountPermissions_account_lastTransaction | null;
}

export interface GqlSessionDataQuery_sessionData_user_accountPermissions {
  __typename: "AccountPermission";
  account: GqlSessionDataQuery_sessionData_user_accountPermissions_account;
}

export interface GqlSessionDataQuery_sessionData_user {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlSessionDataQuery_sessionData_user_profile;
  accountGroups: GqlSessionDataQuery_sessionData_user_accountGroups[] | null;
  accountPermissions: GqlSessionDataQuery_sessionData_user_accountPermissions[] | null;
}

export interface GqlSessionDataQuery_sessionData_allUsers_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlSessionDataQuery_sessionData_allUsers {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlSessionDataQuery_sessionData_allUsers_profile;
}

export interface GqlSessionDataQuery_sessionData {
  __typename: "SessionDataResponse";
  user: GqlSessionDataQuery_sessionData_user;
  allUsers: GqlSessionDataQuery_sessionData_allUsers[];
}

export interface GqlSessionDataQuery {
  sessionData: GqlSessionDataQuery_sessionData | null;
}
