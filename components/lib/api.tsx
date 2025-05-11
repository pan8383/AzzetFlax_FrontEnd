import { AxiosResponse } from 'axios';
import { apiClient } from './apiClient';

export const getRequest = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get<T>(url);
  return response.data;
};