/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserProfileInput, LocaleCode, Currency, TransactionType } from "./../../globalTypes";

// ====================================================
// GraphQL mutation operation: GqlUpdateUserProfile
// ====================================================

export interface GqlUpdateUserProfile_updateUserProfile_profile {
  __typename: "UserProfile";
  firstName: string;
  lastName: string;
  email: string;
  locale: LocaleCode;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_accountGroup_user;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_permissions_user;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_accountGroup;
  permissions: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_permissions[] | null;
  lastTransaction: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts_lastTransaction | null;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountGroups {
  __typename: "AccountGroup";
  id: string;
  name: string;
  accounts: GqlUpdateUserProfile_updateUserProfile_accountGroups_accounts[] | null;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_accountGroup_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_accountGroup {
  __typename: "AccountGroup";
  id: string;
  user: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_accountGroup_user;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_permissions_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_permissions {
  __typename: "AccountPermission";
  id: string;
  canEdit: boolean | null;
  user: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_permissions_user;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_lastTransaction_user {
  __typename: "User";
  id: string;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_lastTransaction {
  __typename: "Transaction";
  id: string;
  type: TransactionType;
  amount: number | null;
  date: any;
  description: string | null;
  user: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_lastTransaction_user;
  updatedAt: any | null;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions_account {
  __typename: "Account";
  id: string;
  name: string;
  amount: number | null;
  currency: Currency;
  transactionsCount: number | null;
  isShared: boolean;
  accountGroup: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_accountGroup;
  permissions: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_permissions[] | null;
  lastTransaction: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account_lastTransaction | null;
}

export interface GqlUpdateUserProfile_updateUserProfile_accountPermissions {
  __typename: "AccountPermission";
  account: GqlUpdateUserProfile_updateUserProfile_accountPermissions_account;
}

export interface GqlUpdateUserProfile_updateUserProfile {
  __typename: "User";
  id: string;
  fullName: string;
  initials: string;
  profile: GqlUpdateUserProfile_updateUserProfile_profile;
  accountGroups: GqlUpdateUserProfile_updateUserProfile_accountGroups[] | null;
  accountPermissions: GqlUpdateUserProfile_updateUserProfile_accountPermissions[] | null;
}

export interface GqlUpdateUserProfile {
  updateUserProfile: GqlUpdateUserProfile_updateUserProfile | null;
}

export interface GqlUpdateUserProfileVariables {
  data: UserProfileInput;
}
