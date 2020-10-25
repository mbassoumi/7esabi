/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL fragment: GqlFragmentAccountGroup
// ====================================================

export interface GqlFragmentAccountGroup_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentAccountGroup_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlFragmentAccountGroup_accounts_accountGroup_user;
}

export interface GqlFragmentAccountGroup_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentAccountGroup_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlFragmentAccountGroup_accounts_permissions_user;
}

export interface GqlFragmentAccountGroup_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentAccountGroup_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlFragmentAccountGroup_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlFragmentAccountGroup_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlFragmentAccountGroup_accounts_accountGroup;
  permissions: GqlFragmentAccountGroup_accounts_permissions[] | null;
  lastTransaction: GqlFragmentAccountGroup_accounts_lastTransaction | null;
}

export interface GqlFragmentAccountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlFragmentAccountGroup_accounts[] | null;
}
