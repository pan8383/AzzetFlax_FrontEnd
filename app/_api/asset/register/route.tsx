import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { Asset } from '@/types/assets';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body: Asset = await req.json();
  const { name, category, model, stock } = body;

  // null チェック（どれか一つでも null または undefined ならエラー）
  if ([name, category, model, stock].some((value) => value == null)) {
    return NextResponse.json({ message: 'すべての項目を入力してください' }, { status: 400 });
  }

  const maxValue = await prisma.assets.aggregate({
    _max: {
      asset_id: true,
    },
  });

  // 払い出し済みのIDの次のIDを生成する
  function getNextSerial(current: string): string {
    const length = current.length;
    const nextNumber = (parseInt(current, 10) + 1).toString().padStart(length, '0');
    return nextNumber;
  }
  const currentId = maxValue._max.asset_id ?? '0000';
  const nextId = getNextSerial(currentId);

  // 新規資材作成（`assets` テーブルに挿入）
  await prisma.assets.create({
    data: {
      asset_id: nextId,
      name,
      category,
      model,
      stock,
    },
  });

  try {
    return NextResponse.json({ message: '資材登録完了', nextId });
  } catch (error: unknown) {
    // errorがErrorオブジェクトであることを確認してからmessageにアクセス
    if (error instanceof Error) {
      return NextResponse.json({ message: 'エラーが発生しました', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: '不明なエラーが発生しました' }, { status: 500 });
    }
  }
}
