import axiosInstance from '@/lib/axiosInstance';
import { BaseResponse } from '@/types/api/api';

/**
 * DELETE API呼び出し
 * @param uri APIエンドポイント
 * @returns BaseResponse<T>
 */
export async function deleteApi<T>(
  uri: string
): Promise<BaseResponse<T>> {
  const response = await axiosInstance.delete<BaseResponse<T>>(uri);
  return response.data;
}