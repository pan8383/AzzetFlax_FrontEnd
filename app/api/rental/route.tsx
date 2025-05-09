import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // データベースから資材情報を取得
    const assets = await prisma.assets.findMany({
      select: {
        asset_id: true,
        name: true,
        category: true,
        model: true,
        stock: true,
      },
      where: { isDeleted: false },
    });

    return new Response(JSON.stringify(assets), { status: 200 });
  } catch (error) {
    return new Response('データ取得エラー', { status: 500 });
  }
}
