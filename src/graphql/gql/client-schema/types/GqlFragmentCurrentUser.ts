/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL fragment: GqlFragmentCurrentUser
// ====================================================

export interface GqlFragmentCurrentUser_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlFragmentCurrentUser_accountGroups_accounts_accountGroup_user;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlFragmentCurrentUser_accountGroups_accounts_permissions_user;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlFragmentCurrentUser_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlFragmentCurrentUser_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlFragmentCurrentUser_accountGroups_accounts_accountGroup;
  permissions: GqlFragmentCurrentUser_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlFragmentCurrentUser_accountGroups_accounts_lastTransaction | null;
}

export interface GqlFragmentCurrentUser_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlFragmentCurrentUser_accountGroups_accounts[] | null;
}

export interface GqlFragmentCurrentUser_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentCurrentUser_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlFragmentCurrentUser_accountPermissions_account_accountGroup_user;
}

export interface GqlFragmentCurrentUser_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentCurrentUser_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlFragmentCurrentUser_accountPermissions_account_permissions_user;
}

export interface GqlFragmentCurrentUser_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentCurrentUser_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlFragmentCurrentUser_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlFragmentCurrentUser_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlFragmentCurrentUser_accountPermissions_account_accountGroup;
  permissions: GqlFragmentCurrentUser_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlFragmentCurrentUser_accountPermissions_account_lastTransaction | null;
}

export interface GqlFragmentCurrentUser_accountPermissions {
  __typename: "AccountPermission";
  account: GqlFragmentCurrentUser_accountPermissions_account;
}

export interface GqlFragmentCurrentUser {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlFragmentCurrentUser_profile;
  accountGroups: GqlFragmentCurrentUser_accountGroups[] | null;
  accountPermissions: GqlFragmentCurrentUser_accountPermissions[] | null;
}
