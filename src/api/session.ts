import { API_SERVER } from '../utils/envVars';
import { getRequest } from './apiHelper';
import { User } from '../@types/User';

export interface LogoutResponse {
  signed_out: boolean;
  redirect_url: string;
}

export const logoutRequestApi = async () => {
  const apiResponse = await getRequest<LogoutResponse>(
    `${API_SERVER}/sessions/logout`,
    {}
  );
  return apiResponse.data!;
};

export const getOauthCallbackApi = async (params: {
  code: string;
  state: string;
}) => {
  console.log('getOauthCallback - params', params);
  const apiResponse = await getRequest<User>(
    `${API_SERVER}/users/auth/cognito/callback`,
    params
  );
  return apiResponse.data!;
};

export const getCurrentUserApi = async () => {
  const apiResponse = await getRequest<User>(`${API_SERVER}/sessions/current`);
  return apiResponse.data!;
};
