import axiosInstance from '@/lib/axiosInstance';
import { BaseResponse } from '@/types/api/api';

export async function postApi<T, V>(
  uri: string,
  payload: V
): Promise<BaseResponse<T>> {
  const response = await axiosInstance.post<BaseResponse<T>>(uri, payload);
  return response.data;
}
