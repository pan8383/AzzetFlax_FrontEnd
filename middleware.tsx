import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // ログイン・サインアップページはチェックしない
  if (url.pathname.startsWith('/login') || url.pathname.startsWith('/signup')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;
  // console.log('token:', token);
  // console.log('JWT_SECRET:', process.env.JWT_SECRET);

  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

// ガード対象のルート
export const config = {
  matcher: ['/asset/:path*', '/profile/:path*'], // ここを保護したいページに変更
};
