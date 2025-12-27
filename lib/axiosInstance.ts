import { useLoginPath } from '@/components/hooks/useNavigation';
import axios from 'axios';

const LOGIN_PATH = useLoginPath();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ログインページ判定
const isLoginPage = () =>
  typeof window !== 'undefined' && window.location.pathname === LOGIN_PATH;


// =======================
// レスポンスインターセプター
// =======================
axiosInstance.interceptors.response.use(
  (response) => response, // 成功時はそのまま返す
  (error) => {
    const status = error.response?.status;

    if (status === 401 && !isLoginPage()) {
      // 401 の場合にログインページへ遷移
      window.location.href = LOGIN_PATH;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
