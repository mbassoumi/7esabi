export const IS_PROD = process.env.NODE_ENV === 'production';
export const API_SERVER = process.env.API_SERVER || 'http://localhost:3010/api';
export const DEFAULT_OAUTH_URL = `${API_SERVER}/users/auth/cognito`;
