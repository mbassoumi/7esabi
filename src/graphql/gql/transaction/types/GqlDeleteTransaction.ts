/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlDeleteTransaction
// ====================================================

export interface GqlDeleteTransaction_deleteTransaction_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteTransaction_deleteTransaction_accountGroup {
  __typename: "AccountGroup";
  id: string;
  name: string;
  user: GqlDeleteTransaction_deleteTransaction_accountGroup_user;
}

export interface GqlDeleteTransaction_deleteTransaction_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteTransaction_deleteTransaction_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlDeleteTransaction_deleteTransaction_permissions_user;
}

export interface GqlDeleteTransaction_deleteTransaction_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlDeleteTransaction_deleteTransaction_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlDeleteTransaction_deleteTransaction_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlDeleteTransaction_deleteTransaction {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  fullName: string;
  accountGroup: GqlDeleteTransaction_deleteTransaction_accountGroup;
  permissions: GqlDeleteTransaction_deleteTransaction_permissions[] | null;
  lastTransaction: GqlDeleteTransaction_deleteTransaction_lastTransaction | null;
}

export interface GqlDeleteTransaction {
  deleteTransaction: GqlDeleteTransaction_deleteTransaction | null;
}

export interface GqlDeleteTransactionVariables {
  id: string;
}
