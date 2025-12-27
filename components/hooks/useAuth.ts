import { postLogoutRequest } from "@/lib/postLogoutRequest";
import { useAuth } from "@/contexts/AuthContext";
import { useLogoutPath } from "./useNavigation";

export const useLogoutRequest = () => {
  const logoutPath = useLogoutPath();
  const { setUser } = useAuth();

  // logout 処理を行う関数を返す
  const logout = async () => {
    try {
      await postLogoutRequest(logoutPath);
      localStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('ログアウトに失敗しました', err);
    }
  };

  return logout;
};
