/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountInput, LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlAddAccount
// ====================================================

export interface GqlAddAccount_addAccount_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlAddAccount_addAccount_accountGroups_accounts_accountGroup_user;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlAddAccount_addAccount_accountGroups_accounts_permissions_user;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlAddAccount_addAccount_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlAddAccount_addAccount_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlAddAccount_addAccount_accountGroups_accounts_accountGroup;
  permissions: GqlAddAccount_addAccount_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlAddAccount_addAccount_accountGroups_accounts_lastTransaction | null;
}

export interface GqlAddAccount_addAccount_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlAddAccount_addAccount_accountGroups_accounts[] | null;
}

export interface GqlAddAccount_addAccount_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccount_addAccount_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlAddAccount_addAccount_accountPermissions_account_accountGroup_user;
}

export interface GqlAddAccount_addAccount_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccount_addAccount_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlAddAccount_addAccount_accountPermissions_account_permissions_user;
}

export interface GqlAddAccount_addAccount_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlAddAccount_addAccount_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlAddAccount_addAccount_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlAddAccount_addAccount_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlAddAccount_addAccount_accountPermissions_account_accountGroup;
  permissions: GqlAddAccount_addAccount_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlAddAccount_addAccount_accountPermissions_account_lastTransaction | null;
}

export interface GqlAddAccount_addAccount_accountPermissions {
  __typename: "AccountPermission";
  account: GqlAddAccount_addAccount_accountPermissions_account;
}

export interface GqlAddAccount_addAccount {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlAddAccount_addAccount_profile;
  accountGroups: GqlAddAccount_addAccount_accountGroups[] | null;
  accountPermissions: GqlAddAccount_addAccount_accountPermissions[] | null;
}

export interface GqlAddAccount {
  addAccount: GqlAddAccount_addAccount | null;
}

export interface GqlAddAccountVariables {
  data: AccountInput;
}
