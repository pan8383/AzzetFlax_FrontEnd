import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    if (!decoded.exp) return true; // expが無い場合は無効扱い

    const currentTime = Date.now() / 1000; // 秒単位
    return decoded.exp < currentTime;
  } catch (e) {
    return true; // デコード失敗は無効扱い
  }
}
