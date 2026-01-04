'use client';

import { useState, useEffect, useCallback } from 'react';
import { getApi } from '@/lib/getApi';
import { getRentalDetailsApiPath } from './useNavigation';
import { RentalDetail, RentalDetailListResponse } from '@/types/api/api';

type Props = {
  rentalId: string;
};

export function useRentalDetailList({ rentalId }: Props) {
  const [rentalDetails, setRentalDetails] = useState<RentalDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchRentalDetails = useCallback(async () => {
    if (!rentalId) return;

    setLoading(true);
    setFetchError(false);

    try {
      const res = await getApi<RentalDetailListResponse>(
        getRentalDetailsApiPath(rentalId)
      );
      setRentalDetails(res.data ?? []);
    } catch {
      setRentalDetails([]);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [rentalId]);

  // 初回 & rentalId 変更時
  useEffect(() => {
    fetchRentalDetails();
  }, [fetchRentalDetails]);

  return {
    rentalDetails,
    loading,
    fetchError,
    refetch: fetchRentalDetails,
  };
}
