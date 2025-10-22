import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { RentalAsset } from '@/types/assets';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const assets: RentalAsset[] = body.assets;

  // 今日（0時）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // 明日（0時）
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // 今日の登録数をカウント（連番のため）
  const todayCount = await prisma.rental_assets.count({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  // IDの生成: 例 RE-20250502-0001
  const yyyymmdd = today.toISOString().slice(0, 10).replace(/-/g, '');
  const paddedNum = String(todayCount + 1).padStart(4, '0');
  const rentalId = `${yyyymmdd}-${paddedNum}`;

  // rental_assetsの作成
  const rentalAssetPromises = assets.map((asset) =>
    prisma.rental_assets.create({
      data: {
        rental_id: rentalId,
        asset_id: asset.asset_id.toString().padStart(4, '0'),
        quantity: asset.count,
      },
    })
  );

  // assetsの在庫更新
  const assetUpdatePromises = assets.map((asset) =>
    prisma.assets.update({
      data: {
        stock: {
          decrement: asset.count,
        },
      },
      where: {
        asset_id: asset.asset_id,
      },
    })
  );

  try {
    // rental_assetsの作成とassetsの更新を一度に行う
    await Promise.all([...rentalAssetPromises, ...assetUpdatePromises]);
    return NextResponse.json({ message: 'レンタル登録完了', rentalId });
  } catch (error: unknown) {
    // errorがErrorオブジェクトであることを確認してからmessageにアクセス
    if (error instanceof Error) {
      return NextResponse.json({ message: 'エラーが発生しました', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: '不明なエラーが発生しました' }, { status: 500 });
    }
  }
}
