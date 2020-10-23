/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL fragment: GqlFragmentTransaction
// ====================================================

export interface GqlFragmentTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlFragmentTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlFragmentTransaction_user;
  updatedAt: any | null;
}
