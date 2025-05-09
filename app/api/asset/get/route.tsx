import { prisma } from '@/lib/prisma';

export async function GET(req: Request): Promise<Response> {
  try {
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
  } catch (error: any) {
    console.error(error.message, error.stack);
    return new Response('データ取得エラー', { status: 500 });
  }
}
