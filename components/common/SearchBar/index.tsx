'use client';

import styles from './SearchBar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
  disabled = false,
  placeholder = '検索',
}: SearchBarProps) {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchKeyword}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button
        className={styles.searchButton}
        onClick={onSearch}
        disabled={disabled}
      >
        検索
      </button>
    </div>
  );
}
