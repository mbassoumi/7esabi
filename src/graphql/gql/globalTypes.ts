/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Currency {
  EURO = "EURO",
  JOD = "JOD",
  NIS = "NIS",
  USD = "USD",
}

export enum LocaleCode {
  AR = "AR",
  EN = "EN",
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export interface AccountGroupInput {
  id?: string | null;
  name: string;
}

export interface AccountInput {
  id?: string | null;
  name: string;
  currency: Currency;
  accountGroup: AccountGroupInput;
  permissions?: AccountPermissionInput[] | null;
}

export interface AccountPermissionInput {
  userId: string;
  canEdit?: boolean | null;
}

export interface TransactionInput {
  id?: string | null;
  accountId?: string | null;
  type: TransactionType;
  amount: number;
  date?: any | null;
  description?: string | null;
}

export interface UserProfileInput {
  id: string;
  locale: LocaleCode;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
