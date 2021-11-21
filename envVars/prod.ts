export const IS_PROD = process.env.NODE_ENV === "production";
export const API_SERVER =
  process.env.API_SERVER || "https://mybank-api.bisoomi.com";
export const DEFAULT_OAUTH_URL = `${API_SERVER}/users/auth/cognito`;
