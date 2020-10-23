/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocaleCode } from "./../../globalTypes";

// ====================================================
// GraphQL fragment: GqlFragmentBasicUserInfo
// ====================================================

export interface GqlFragmentBasicUserInfo_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlFragmentBasicUserInfo {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlFragmentBasicUserInfo_profile;
}
