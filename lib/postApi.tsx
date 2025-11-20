import axiosInstance from '@/lib/axiosInstance';

export async function PostApi<T, V>(uri: string, payload: V): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(uri, payload);
    return response.data;
  } catch (error) {
    console.error(`API fetch error: ${uri}`, error);
    throw error;
  }
};
