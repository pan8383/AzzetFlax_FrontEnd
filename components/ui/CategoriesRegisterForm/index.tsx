'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from 'lib/axiosInstance';
import { AxiosError } from 'axios';
import { AssetsRegisterParams } from 'types/assets';
import { useCategories } from 'hooks/useCategories';
import CategoriesList from '../CategoriesList';

import styles from './CategoriesRegisterForm.module.css';

export default function CategoriesRegisterForm() {
    const { refetch } = useCategories();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AssetsRegisterParams>({
        defaultValues: { name: '' },
    });

    const onSubmit = async (data: AssetsRegisterParams) => {
        setError('');
        setSuccess('');
        try {
            await axiosInstance.post('/categories/register', data);
            setSuccess(`「${data.name}」を登録しました。`);
            reset();
            await refetch();
        } catch (err) {
            if (err instanceof AxiosError) {
                const msg = err.response?.data?.error?.message || 'サーバーエラーが発生しました';
                setError(msg);
            } else {
                setError('サーバーエラーが発生しました');
            }
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.title}>カテゴリー登録</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>
                        カテゴリー名
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={styles.input}
                        {...register('name', {
                            required: 'カテゴリー名は必須です',
                            maxLength: {
                                value: 50,
                                message: '50文字以内で入力してください',
                            },
                            minLength: {
                                value: 2,
                                message: '2文字以上で入力してください',
                            },
                        })}
                    />
                    {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
                </div>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? '登録中...' : '登録'}
                </button>

                {success && <p className={styles.successMsg}>{success}</p>}
                {error && <p className={styles.errorMsg}>{error}</p>}
            </form>
            <CategoriesList />
        </div>
    );
}
