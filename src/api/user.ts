import { API_SERVER } from '../utils/envVars';
import { getRequest, putRequest } from './apiHelper';
import { Account } from '../@types/Account';
import { User } from '../@types/User';

export interface UserParams {
  locale: string;
}

export const listUsersApi = async () => {
  const apiResponse = await getRequest<User[]>(`${API_SERVER}/users`);
  return apiResponse.data!;
};

export const updateUserApi = async (id: number, userParams: UserParams) => {
  const apiResponse = await putRequest<Account>(`${API_SERVER}/users/${id}`, {
    user: userParams,
  });
  return apiResponse.data!;
};
