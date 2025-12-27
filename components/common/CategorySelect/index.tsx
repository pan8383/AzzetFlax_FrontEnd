'use client';

import styles from './CategorySelect.module.css';
import { useCategory } from '@/components/hooks/useCategory';

type CategorySelectProps = {
  value: string;
  onCategoryChange: (categoryCode: string) => void;
};

export default function CategorySelect({ value, onCategoryChange }: CategorySelectProps) {
  const { category, categoryLoading, categoryFetchError } = useCategory();

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
    <div className={styles.categorySelectContainer}>
      <label htmlFor="category" className={styles.label}>カテゴリ</label>
      <select
        id="category"
        name="category"
        className={styles.selectBox}
        value={value || ''}
        onChange={e => onCategoryChange(e.target.value)}
      >
        <option value="">すべて</option>
        {category.map(category => (
          <option key={category.categoryCode} value={category.categoryCode}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
