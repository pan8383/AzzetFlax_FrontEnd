'use client';

import styles from './RentalHistoryTableView.module.css';
import { useNavigateRentalHistoryDetail } from '@/components/hooks/useNavigation';
import { BaseTable } from '@/components/common/BaseTable';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { RentalHistory } from '@/types/api/api';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import { RentalHistoryQueryParams } from '@/components/hooks/useRentalHistory';

type Props = {
  updateQueryParams: (updater: (prev: RentalHistoryQueryParams) => RentalHistoryQueryParams) => void;
};

export default function RentalHistoryStatusFilter({ updateQueryParams }: Props) {
  const [statusFilter, setStatusFilter] = useState<("RETURNED" | "RENTED")[]>([]);

  const handleStatusChange = (status: "RETURNED" | "RENTED") => {
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
      <label>
        <input
          type="checkbox"
          checked={statusFilter.includes("RETURNED")}
          onChange={() => handleStatusChange("RETURNED")}
        />
        返却済み
      </label>

      <label>
        <input
          type="checkbox"
          checked={statusFilter.includes("RENTED")}
          onChange={() => handleStatusChange("RENTED")}
        />
        レンタル中
      </label>
    </>
  );
}
