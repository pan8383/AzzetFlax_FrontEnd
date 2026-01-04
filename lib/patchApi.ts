import axiosInstance from '@/lib/axiosInstance';
import { BaseResponse } from '@/types/api/api';

/**
 * PATCH API呼び出し
 * @param uri APIエンドポイント
 * @param payload 更新データ
 * @returns BaseResponse<T>
 */
export async function patchApi<T, V>(
  uri: string,
  payload: V
): Promise<T> {
  const response = await axiosInstance.patch<T>(uri, payload);
  return response.data;
}
