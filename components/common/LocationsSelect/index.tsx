'use client';

import clsx from 'clsx';
import styles from './LocationsSelect.module.css';
import { useLocations } from '@/components/hooks/useLocations';

type LocationsSelectProps = {
  className?: string;
  value: string;
  onLocationsChange: (locationCode: string) => void;
  disabled?: boolean;
};

export default function LocationsSelect({ className, value, onLocationsChange, disabled = false }: LocationsSelectProps) {
  const { locations, locationsLoading, locationsFetchError } = useLocations();

  const selectBox = clsx(
    className || styles.selectBox,
  );

  // ローディング中表示
  if (locationsLoading) {
    return <div className={styles.statusText}>ロケーションを読み込み中...</div>;
  }

  // 取得エラー表示
  if (locationsFetchError) {
    return (
      <div className={styles.statusTextError}>
        ロケーションの取得に失敗しました：{locationsFetchError}
      </div>
    );
  }

  // データが空の場合
  if (!locations || locations.length === 0) {
    return <div className={styles.statusText}>データがありません。</div>;
  }

  return (
    <>
      <select
        className={selectBox}
        id="locationCode"
        name="locationCode"
        value={value || ''}
        onChange={e => onLocationsChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">選択してください</option>
        {locations.map(locations => (
          <option key={locations.locationCode} value={locations.locationCode}>
            {locations.name}
          </option>
        ))}
      </select>
    </>
  );
}
