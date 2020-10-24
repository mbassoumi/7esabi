/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL fragment: GqlFragmentAccount
// ====================================================

export interface GqlFragmentAccount_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentAccount_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlFragmentAccount_accountGroup_user;
}

export interface GqlFragmentAccount_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentAccount_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlFragmentAccount_permissions_user;
}

export interface GqlFragmentAccount_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentAccount_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlFragmentAccount_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlFragmentAccount {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlFragmentAccount_accountGroup;
  permissions: GqlFragmentAccount_permissions[] | null;
  lastTransaction: GqlFragmentAccount_lastTransaction | null;
}
