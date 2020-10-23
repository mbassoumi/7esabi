/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionInput, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlUpdateTransaction
// ====================================================

export interface GqlUpdateTransaction_updateTransaction_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateTransaction_updateTransaction_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlUpdateTransaction_updateTransaction_accountGroup_user;
}

export interface GqlUpdateTransaction_updateTransaction_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateTransaction_updateTransaction_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateTransaction_updateTransaction_permissions_user;
}

export interface GqlUpdateTransaction_updateTransaction_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateTransaction_updateTransaction_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateTransaction_updateTransaction_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateTransaction_updateTransaction {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlUpdateTransaction_updateTransaction_accountGroup;
  permissions: GqlUpdateTransaction_updateTransaction_permissions[] | null;
  lastTransaction: GqlUpdateTransaction_updateTransaction_lastTransaction | null;
}

export interface GqlUpdateTransaction {
  updateTransaction: GqlUpdateTransaction_updateTransaction | null;
}

export interface GqlUpdateTransactionVariables {
  data: TransactionInput;
}
