import { z } from 'zod';
import { ValidationResult } from './result';

export const checkUsersSignupValidation = (displayName: string, email: string, password: string): ValidationResult => {
    const userValidation = z.object({
        displayName: z.string().min(5, '表示名は5文字以上必要です').max(30, '表示名は30文字以内で入力してください'),
        email: z
            .string()
            .min(5, 'メールアドレスは5文字以上必要です')
            .max(254, 'メールアドレスは254文字以内で入力してください')
            .email('正しいメールアドレスを入力してください'),
        password: z.string().min(8, 'パスワードは8文字以上必要です').max(50, 'パスワードは50文字以内で入力してください'),
    });

    const result = userValidation.safeParse({ displayName, email, password });

    if (!result.success) {
        const errorMessages = result.error.errors.map((e) => e.message).join(', ');
        return [false, errorMessages];
    }

    return [true, ''];
};
