import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET_KEY || '';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'トークンがありません' }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;
    return NextResponse.json({ role: decodedToken.role, isValid: true });
  } catch (error) {
    return NextResponse.json({ message: 'トークンが無効または期限切れです', isValid: false }, { status: 401 });
  }
}
