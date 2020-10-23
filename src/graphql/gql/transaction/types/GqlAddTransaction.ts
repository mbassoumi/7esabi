/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionInput, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlAddTransaction
// ====================================================

export interface GqlAddTransaction_addTransaction_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlAddTransaction_addTransaction_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlAddTransaction_addTransaction_accountGroup_user;
}

export interface GqlAddTransaction_addTransaction_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlAddTransaction_addTransaction_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlAddTransaction_addTransaction_permissions_user;
}

export interface GqlAddTransaction_addTransaction_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlAddTransaction_addTransaction_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlAddTransaction_addTransaction_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlAddTransaction_addTransaction {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlAddTransaction_addTransaction_accountGroup;
  permissions: GqlAddTransaction_addTransaction_permissions[] | null;
  lastTransaction: GqlAddTransaction_addTransaction_lastTransaction | null;
}

export interface GqlAddTransaction {
  addTransaction: GqlAddTransaction_addTransaction | null;
}

export interface GqlAddTransactionVariables {
  data: TransactionInput;
}
