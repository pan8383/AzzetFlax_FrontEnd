import axiosInstance from "@/lib/axiosInstance";

/**
 * サーバにログアウトリクエストを送信して、クッキーを削除する
 */
export const postLogoutRequest = async (logoutPath: string) => {
  try {
    await axiosInstance.post(logoutPath);
  } catch (err: any) {
    console.error(err.response?.data || err);
    throw err;
  }
};