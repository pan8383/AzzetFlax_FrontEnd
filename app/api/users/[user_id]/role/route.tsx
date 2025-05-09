import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { user_id: string } }) {
  try {
    // リクエストボディを取得（1回だけ呼ぶ）
    const { role } = await req.json();
    const { user_id } = await params;

    // Prisma を使ってユーザーの役職を更新
    const updatedUser = await prisma.users.update({
      where: { user_id: String(user_id) },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('ユーザー権限の更新エラー:', error);
    return NextResponse.json({ message: '権限の更新に失敗しました' }, { status: 500 });
  }
}
