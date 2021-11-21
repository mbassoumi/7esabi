import { API_SERVER } from '../utils/envVars';
import { getRequest, putRequest } from './apiHelper';
import { Account } from '../@types/Account';
import { User } from '../@types/User';

export interface UserParams {
  locale: string;
}

export const listUsersApi = async () =>
  getRequest<User[]>(`${API_SERVER}/users`);

export const updateUserApi = async (id: number, userParams: UserParams) =>
  putRequest<Account>(`${API_SERVER}/users/${id}`, {
    user: userParams,
  });
