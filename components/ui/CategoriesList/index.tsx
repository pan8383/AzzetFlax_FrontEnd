'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import ConfirmModal from '../ConfirmModal';
import styles from './CategoriesList.module.css';
import { useCategories } from '@/components/hooks/useCategories';
import axiosInstance from '@/lib/axiosInstance';
import { CategoriesResponseDTO } from '@/types/categories';

export default function CategoriesList() {
    const { categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    /** 削除ボタン押下時 */
    const handleDeleteClick = (name: string) => {
        setSelectedCategory(name);
    };

    /** 確認モーダルで「OK」押下時 */
    const handleConfirm = async () => {
        if (!selectedCategory) return;

        try {
            await axiosInstance.post('/categories/delete', {
                name: selectedCategory,
            } as CategoriesResponseDTO);

            setMessage({
                type: 'success',
                text: `カテゴリー「${selectedCategory}」を削除しました。`,
            });

            // 最新データを取得する
            window.location.reload();
        } catch (err) {
            const msg =
                err instanceof AxiosError
                    ? err.response?.data?.error?.message || 'サーバーエラーが発生しました'
                    : 'サーバーエラーが発生しました';
            setMessage({ type: 'error', text: msg });
        } finally {
            setSelectedCategory(null);
        }
    };

    /** モーダルキャンセル時 */
    const handleCancel = () => {
        setSelectedCategory(null);
    };

    return (
        <div className={styles.container}>
            {/* アコーディオン開閉 */}
            <input id="category-toggle" type="checkbox" className={styles.toggle} />
            <label className={styles.label} htmlFor="category-toggle">
                カテゴリ一覧
            </label>

            <ul className={styles.content}>
                {categories.map((category) => (
                    <li
                        key={category.name}
                        className={`${styles['list-item']} ${selectedCategory === category.name ? styles['list-item--selected'] : ''
                            }`}
                    >
                        <span>{category.name}</span>
                        <button
                            type="button"
                            className={styles['delete-button']}
                            onClick={() => handleDeleteClick(category.name)}
                        >
                            削除
                        </button>
                    </li>
                ))}
            </ul>

            {/* 確認モーダル */}
            <ConfirmModal
                isOpen={selectedCategory !== null}
                message={`カテゴリー「${selectedCategory}」を削除してもよろしいですか？`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            {/* メッセージ */}
            {message && (
                <p
                    className={`${styles.message} ${message.type === 'success' ? styles['message--success'] : styles['message--error']
                        }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    );
}
