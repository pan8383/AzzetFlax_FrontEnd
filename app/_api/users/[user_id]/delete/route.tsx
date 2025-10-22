import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { user_id: string } }) {
  try {
    const { user_id } = await params;

    // ユーザーの存在チェック
    const userExists = await prisma.users.findUnique({
      where: { user_id: String(user_id) },
    });

    if (!userExists) {
      return NextResponse.json({ message: 'ユーザーが存在しません' }, { status: 404 });
    }

    // isDeleted を true（削除済）に更新
    await prisma.users.update({
      where: { user_id: String(user_id) },
      data: { isDeleted: true },
    });

    return NextResponse.json({ message: 'ユーザー削除の更新に成功しました' }, { status: 200 });
  } catch (error) {
    console.error('ユーザー削除の更新エラー:', error);
    return NextResponse.json({ message: 'ユーザー削除の更新に失敗しました' }, { status: 500 });
  }
}
