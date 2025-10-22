import { z } from 'zod';
import { ValidationResult } from './result';
import { AssetsRegisterParams } from '@/types/assets';

export const checkAssetsRegisterValidation = ({ name, category, model, stock }: AssetsRegisterParams): ValidationResult => {
  const userValidation = z.object({
    name: z.string().min(2, '表示名は2文字以上必要です').max(30, '表示名は255文字以内で入力してください'),
    category: z.string().min(2, 'カテゴリーは2文字以上必要です').max(20, 'カテゴリーは20文字以内で入力してください'),
    model: z.string().min(2, '型番は2文字以上必要です').max(50, '型番は50文字以内で入力してください'),
    stock: z.number().int("整数で入力してください").min(0, "0以上で入力してください").max(1000, "1000以下で入力してください"),
  });

  const result = userValidation.safeParse({ name, category, model, stock });

  if (!result.success) {
    const errorMessages = result.error.errors.map((e) => e.message).join(', ');
    return [false, errorMessages];
  }

  return [true, ''];
};
