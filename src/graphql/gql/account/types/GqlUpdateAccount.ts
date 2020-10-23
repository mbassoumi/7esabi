/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountInput, LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlUpdateAccount
// ====================================================

export interface GqlUpdateAccount_updateAccount_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlUpdateAccount_updateAccount_accountGroups_accounts_accountGroup_user;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateAccount_updateAccount_accountGroups_accounts_permissions_user;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateAccount_updateAccount_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateAccount_updateAccount_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlUpdateAccount_updateAccount_accountGroups_accounts_accountGroup;
  permissions: GqlUpdateAccount_updateAccount_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlUpdateAccount_updateAccount_accountGroups_accounts_lastTransaction | null;
}

export interface GqlUpdateAccount_updateAccount_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlUpdateAccount_updateAccount_accountGroups_accounts[] | null;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlUpdateAccount_updateAccount_accountPermissions_account_accountGroup_user;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateAccount_updateAccount_accountPermissions_account_permissions_user;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateAccount_updateAccount_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlUpdateAccount_updateAccount_accountPermissions_account_accountGroup;
  permissions: GqlUpdateAccount_updateAccount_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlUpdateAccount_updateAccount_accountPermissions_account_lastTransaction | null;
}

export interface GqlUpdateAccount_updateAccount_accountPermissions {
  __typename: "AccountPermission";
  account: GqlUpdateAccount_updateAccount_accountPermissions_account;
}

export interface GqlUpdateAccount_updateAccount {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlUpdateAccount_updateAccount_profile;
  accountGroups: GqlUpdateAccount_updateAccount_accountGroups[] | null;
  accountPermissions: GqlUpdateAccount_updateAccount_accountPermissions[] | null;
}

export interface GqlUpdateAccount {
  updateAccount: GqlUpdateAccount_updateAccount | null;
}

export interface GqlUpdateAccountVariables {
  data: AccountInput;
}
