import { z } from 'zod';

type ValidationResult = [boolean, string];

export const checkSignupValidation = (
  user_id: string,
  password: string,
  name: string,
  email: string
): ValidationResult => {
  const userValidation = z.object({
    user_id: z.string().min(5, 'ユーザーIDは5文字以上必要です').max(30, 'ユーザーIDは30文字以内で入力してください'),
    password: z.string().min(8, 'パスワードは8文字以上必要です').max(50, 'パスワードは50文字以内で入力してください'),
    name: z.string().min(2, '名前は2文字以上必要です').max(30, '名前は30文字以内で入力してください'),
    email: z
      .string()
      .min(5, 'メールアドレスは5文字以上必要です')
      .max(254, 'メールアドレスは254文字以内で入力してください')
      .email('正しいメールアドレスを入力してください'),
  });

  const result = userValidation.safeParse({ user_id, password, name, email });

  if (!result.success) {
    const errorMessages = result.error.errors.map((e) => e.message).join(', ');
    return [false, errorMessages];
  }

  return [true, ''];
};
