/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL query operation: GqlTransactionsPaginated
// ====================================================

export interface GqlTransactionsPaginated_transactions_user {
  __typename: "User";
  id: string;
}

export interface GqlTransactionsPaginated_transactions {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlTransactionsPaginated_transactions_user;
  updatedAt: any | null;
}

export interface GqlTransactionsPaginated {
  /**
   * returns paginated transactions from cursor. Default take: 10 items
   */
  transactions: GqlTransactionsPaginated_transactions[] | null;
}

export interface GqlTransactionsPaginatedVariables {
  accountId: string;
  skip?: number | null;
  take?: number | null;
}
