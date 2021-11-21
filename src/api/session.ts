import { API_SERVER } from '../utils/envVars';
import { getRequest, postRequest } from './apiHelper';
import { User } from '../@types/User';

export const logoutRequestApi = async () =>
  postRequest(`${API_SERVER}/sessions/logout`, {});

export const getOauthCallbackApi = async (params: {
  code: string;
  state: string;
}) => {
  console.log('getOauthCallback - params', params);
  return await getRequest<User>(
    `${API_SERVER}/users/auth/cognito/callback`,
    params
  );
};

export const getCurrentUserApi = async () =>
  getRequest<User>(`${API_SERVER}/sessions/current`);
