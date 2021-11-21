import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data?: T;
  errors?: [any];
}

const doRequest = async <T>(configs: AxiosRequestConfig = {}): Promise<T> => {
  console.log('doRequest - configs:', configs);
  const response: AxiosResponse<ApiResponse<T>> = await axios(configs);

  console.log('doRequest - response', response);
  console.log('doRequest - response.data', response.data);
  return response.data.data!;
};

export const getRequest = async <T>(
  url: string,
  params: Record<string, string | number> = {},
  headers: Record<string, string> = {}
) => doRequest<T>({ method: 'get', url, params, headers });

export const postRequest = async <T>(
  url: string,
  data: any = {},
  headers: Record<string, string> = {}
) => doRequest<T>({ method: 'post', url, data, headers });

export const putRequest = async <T>(
  url: string,
  data: any = {},
  headers: Record<string, string> = {}
) => doRequest<T>({ method: 'put', url, data, headers });

export const deleteRequest = async (
  url: string,
  params: any = {},
  headers: Record<string, string> = {}
) => doRequest<undefined>({ method: 'delete', url, params, headers });
