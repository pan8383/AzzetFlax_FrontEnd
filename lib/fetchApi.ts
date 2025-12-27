import axiosInstance from '@/lib/axiosInstance';
import { AxiosRequestConfig } from 'axios';

export async function fetchApi<T>(uri: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(uri, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
