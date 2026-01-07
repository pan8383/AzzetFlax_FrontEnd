'use client';

import styles from './CategorySelect.module.css';
import clsx from 'clsx';
import { useCategory } from '@/components/hooks/useCategory';

type CategorySelectProps = {
  className?: string;
  value: string;
  onCategoryChange: (categoryCode: string) => void;
  disabled?: boolean;
};

export default function CategorySelect({ className, value, onCategoryChange, disabled }: CategorySelectProps) {
  const { category, categoryLoading, categoryFetchError } = useCategory();

  const selectBox = clsx(
    className || styles.selectBox,
  );

  // ローディング中表示
  if (categoryLoading) {
    return <div className={styles.statusText}>カテゴリを読み込み中...</div>;
  }

  // 取得エラー表示
  if (categoryFetchError) {
    return (
      <div className={styles.statusTextError}>
        カテゴリの取得に失敗しました：{categoryFetchError}
      </div>
    );
  }

  // データが空の場合
  if (!category || category.length === 0) {
    return <div className={styles.statusText}>データがありません。</div>;
  }

  return (
    <>
      <select
        className={selectBox}
        id="categoryCode"
        name="categoryCode"
        value={value || ''}
        onChange={e => onCategoryChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">すべて</option>
        {category.map(category => (
          <option key={category.categoryCode} value={category.categoryCode}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}
