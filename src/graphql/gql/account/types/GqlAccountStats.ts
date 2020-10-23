/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GqlAccountStats
// ====================================================

export interface GqlAccountStats_accountStats {
  __typename: "AccountStatsPoint";
  userId: string;
  amount: number;
}

export interface GqlAccountStats {
  accountStats: GqlAccountStats_accountStats[] | null;
}

export interface GqlAccountStatsVariables {
  accountId: string;
}
