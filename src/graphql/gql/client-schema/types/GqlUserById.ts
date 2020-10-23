/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocaleCode } from "./../../globalTypes";

// ====================================================
// GraphQL query operation: GqlUserById
// ====================================================

export interface GqlUserById_userById_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlUserById_userById {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlUserById_userById_profile;
}

export interface GqlUserById {
  userById: GqlUserById_userById | null;
}

export interface GqlUserByIdVariables {
  id: string;
}
