import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface LoginInfo {
	user_id: string;
	password: string;
}

interface JwtPayload {
	user_id: string;
	role: string;
}

const prisma = new PrismaClient();
const jwtSecretKey = process.env.jwtSecretKey || '';

export async function POST(req: NextRequest) {
	if (!jwtSecretKey) {
		console.error('JWTエラー: 秘密鍵が設定されていません');
	}

	try {
		const { user_id, password }: LoginInfo = await req.json();

		// ユーザーをデータベースから検索
		const user = await prisma.users.findUnique({
			where: { user_id },
		});

		// ユーザーが見つからない場合
		if (!user) {
			return NextResponse.json({ error: 'ユーザーIDまたはパスワードが間違っています' }, { status: 401 });
		}

		// パスワードの比較
		const passwordMatches = await bcrypt.compare(password, user.password);
		if (!passwordMatches) {
			return NextResponse.json({ error: 'ユーザーIDまたはパスワードが間違っています' }, { status: 401 });
		}

		// ペイロード
		const payload: JwtPayload = {
			user_id: user.user_id,
			role: user.role,
		};

		// JWTを生成
		const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
		return NextResponse.json({ message: 'ログイン成功', token }, { status: 200 });
	} catch (error) {
		console.error('Error during login:', error);
		return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
	}
}
