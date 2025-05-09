import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

// PrismaClientのインスタンスを作成
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { user_id, password, name, email } = await req.json();

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー検索
    const duplicateUser = await prisma.users.findFirst({
      where: {
        OR: [{ user_id }, { email }],
      },
    });

    // 重複チェック
    if (duplicateUser) {
      if (duplicateUser.user_id === user_id) {
        return NextResponse.json({ error: 'このユーザーIDは既に存在します' }, { status: 400 });
      }
      if (duplicateUser.email === email) {
        return NextResponse.json({ error: 'このメールアドレスは既に存在します' }, { status: 400 });
      }
    }

    // 新規ユーザー作成（`users` テーブルに挿入）
    await prisma.users.create({
      data: {
        user_id,
        password: hashedPassword,
        name,
        email,
      },
    });

    return NextResponse.json({ message: 'ユーザー登録成功' }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
