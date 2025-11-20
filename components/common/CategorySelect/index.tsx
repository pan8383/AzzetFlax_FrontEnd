'use client';

import styles from './CategorySelect.module.css';
import { useCategories } from '@/components/hooks/useCategories';

type CategorySelectProps = {
  value: string;
  onCategoryChange: (category_name: string) => void;
};

export default function CategorySelect({ value, onCategoryChange }: CategorySelectProps) {
  const { categories, categoriesLoading, categoriesFetchError } = useCategories();

  // ローディング中表示
  if (categoriesLoading) {
    return <div className={styles.statusText}>カテゴリを読み込み中...</div>;
  }

  // 取得エラー表示
  if (categoriesFetchError) {
    return (
      <div className={styles.statusTextError}>
        カテゴリの取得に失敗しました：{categoriesFetchError}
      </div>
    );
  }

  // データが空の場合
  if (!categories || categories.length === 0) {
    return <div className={styles.statusText}>データがありません。</div>;
  }

  return (
    <div className={styles.categorySelectContainer}>
      <label htmlFor="category" className={styles.label}>
        カテゴリ
      </label>
      <select
        id="category"
        name="category"
        className={styles.selectBox}
        value={value || ''}
        onChange={e => onCategoryChange(e.target.value)}
      >
        <option value="">選択してください</option>
        {categories.map(category => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
