'use client';

import styles from './BaseTable.module.css';

/**
 * @property key ヘッダー
 * @property label 値
 * @property sortable ソート可能なテーブルの場合-> true
 */
export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
};

/**
 * @property currentPage 現在のページ番号（1始まり）
 * @property totalPages 総ページ数
 * @property onPageChange ページ変更時に呼ばれるコールバック
 */
export type BaseTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onSort?: (key: keyof T) => void;
  onRowClick?: (row: T) => void;
};

export default function BaseTable<T>({
  columns,
  data,
  onSort,
  onRowClick,
}: BaseTableProps<T>) {
  return (
    <div className={styles.layout}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={styles.th}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${onRowClick ? styles.clickableRow : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(col => (
                <td key={String(col.key)} className={styles.td}>
                  {typeof row[col.key] === 'object' && row[col.key] !== null
                    ? (row[col.key] as React.ReactNode)
                    : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}