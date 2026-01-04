'use client';

import styles from './RentalListStatusFilter.module.css';
import { useEffect, useState } from 'react';
import { RentalListQueryParams } from '@/components/hooks/useRentalList';
import { RentalStatus, rentalStatusLabelMap } from '@/types/RentalStatus';

/**
 * フィルタ対象ステータス
 */
const FILTERABLE_STATUSES: readonly RentalStatus[] = [
  'RENTED',
  'RETURNED',
];

type Props = {
  updateQueryParams: (
    updater: (prev: RentalListQueryParams) => RentalListQueryParams
  ) => void;
};

export default function RentalListStatusFilter({ updateQueryParams }: Props) {
  const [statusFilter, setStatusFilter] = useState<RentalStatus[]>([]);

  const handleStatusChange = (status: RentalStatus) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  useEffect(() => {
    updateQueryParams((prev) => ({
      ...prev,
      statuses: statusFilter.length > 0 ? statusFilter : undefined,
      page: 0,
    }));
  }, [statusFilter]);

  return (
    <>
      {FILTERABLE_STATUSES.map((status) => (
        <label key={status}>
          <input
            type="checkbox"
            checked={statusFilter.includes(status)}
            onChange={() => handleStatusChange(status)}
          />
          {rentalStatusLabelMap[status]}
        </label>
      ))}
    </>
  );
}
