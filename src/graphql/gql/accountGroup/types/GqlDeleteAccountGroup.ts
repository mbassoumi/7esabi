/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlDeleteAccountGroup
// ====================================================

export interface GqlDeleteAccountGroup_deleteAccountGroup_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_accountGroup_user;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_permissions_user;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_accountGroup;
  permissions: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts_lastTransaction | null;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups_accounts[] | null;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_accountGroup_user;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_permissions_user;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_accountGroup;
  permissions: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account_lastTransaction | null;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions {
  __typename: "AccountPermission";
  account: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions_account;
}

export interface GqlDeleteAccountGroup_deleteAccountGroup {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlDeleteAccountGroup_deleteAccountGroup_profile;
  accountGroups: GqlDeleteAccountGroup_deleteAccountGroup_accountGroups[] | null;
  accountPermissions: GqlDeleteAccountGroup_deleteAccountGroup_accountPermissions[] | null;
}

export interface GqlDeleteAccountGroup {
  deleteAccountGroup: GqlDeleteAccountGroup_deleteAccountGroup | null;
}

export interface GqlDeleteAccountGroupVariables {
  id: string;
}
