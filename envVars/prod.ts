/* eslint-disable */
export const IS_PROD = true;
export const API_SERVER =
  process.env.API_SERVER || "https://mybank-api.bisoomi.com/api";
export const DEFAULT_OAUTH_URL = `${API_SERVER}/users/auth/cognito`;
