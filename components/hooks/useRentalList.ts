'use client';

import { useState, useEffect } from 'react';
import { getApi } from '@/lib/getApi';
import { PaginationState } from '../common/Pagination/Pagination';
import { RentalAssetsList, RentalListResponse } from '@/types/api/api';
import { getRentalsApiPath } from './useNavigation';
import { RentalStatus } from '@/types/RentalStatus';

/**
 * APIリクエストパラメータ（レンタル履歴）
 */
export type RentalListQueryParams = {
  statuses: RentalStatus[] | undefined;
  page: number;
  size: number;
  sortField: keyof RentalAssetsList;
  sortDirection: 'asc' | 'desc';
}

/**
 * レンタル一覧をGETする
 * @param rowSize // 1リクエストで取得するサイズ
 */
export function useRentalList(rowSize: number) {
  const [rentals, setRentals] = useState<RentalAssetsList[]>([]);
  const [searchParams, setSearchParams] = useState<RentalListQueryParams>({
    statuses: undefined,
    page: 0,
    size: rowSize,
    sortField: 'rentalDate',
    sortDirection: 'desc',
  });
  const [pageInfo, setPageInfo] = useState<PaginationState>({
    page: 0,
    size: rowSize,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);
      try {
        const res = await getApi<RentalListResponse>(getRentalsApiPath(), {
          params: {
            statuses: searchParams.statuses,
            page: searchParams.page,
            size: searchParams.size,
            sort: searchParams.sortField
              ? `${searchParams.sortField},${searchParams.sortDirection}`
              : undefined,
          }
        });

        // レスポンスデータを取り出してsteteに追加
        setRentals(res.content ?? []);
        setPageInfo({
          page: searchParams.page,
          size: searchParams.size,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
        });
      } catch {
        setPageInfo({
          page: searchParams.page,
          size: searchParams.size,
          totalPages: 0,
          totalElements: 0,
        });
        setRentals([]);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    searchParams.statuses,
    searchParams.sortField,
    searchParams.sortDirection,
    searchParams.size,
    searchParams.page,
  ]);

  const updateQueryParams = (updater: (prev: RentalListQueryParams) => RentalListQueryParams) => {
    setSearchParams(prev => updater(prev));
  };

  return {
    rentals,
    pageInfo,
    loading,
    fetchError,
    searchParams,
    updateQueryParams,
  };
}
