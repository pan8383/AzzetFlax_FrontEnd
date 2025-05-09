import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // データベースからユーザー情報を取得
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { isDeleted: false },
    });

    // レスポンスとしてユーザー情報を返す
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response('データ取得エラー', { status: 500 });
  }
}
