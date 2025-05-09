import { z } from 'zod';

export const assetValidation = z.object({
  name: z.string().min(1, '名前は必須です').max(60, '60文字以内で入力してください'),
  category: z.string().min(1, 'カテゴリは必須です').max(20, '20文字以内で入力してください'),
  model: z.string().min(1, '型番は必須です').max(20, '60文字以内で入力してください'),
  stock: z
    .string()
    .regex(/^[0-9]+$/, '在庫は半角数字で入力してください')
    .transform((val) => Number(val)),
});
