import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { Asset } from '@/types/assets';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const assetIds: string[] = body.assetIds;

    if (!Array.isArray(assetIds) || assetIds.length === 0) {
      return NextResponse.json({ message: '削除対象が指定されていません' }, { status: 400 });
    }

    await prisma.assets.deleteMany({
      where: { asset_id: { in: assetIds } },
    });

    return NextResponse.json({ message: '資材削除完了', deleted: assetIds });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'エラーが発生しました', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: '不明なエラーが発生しました' }, { status: 500 });
    }
  }
}
