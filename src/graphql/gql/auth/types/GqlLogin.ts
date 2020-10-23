/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GqlLogin
// ====================================================

export interface GqlLogin_login {
  __typename: "SuccessResponse";
  success: boolean | null;
}

export interface GqlLogin {
  login: GqlLogin_login | null;
}

export interface GqlLoginVariables {
  code: string;
}
