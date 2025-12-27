'use client';

import { useState, useEffect } from 'react';
import { useRentalHistoryPath } from './useNavigation';
import { fetchApi } from '@/lib/fetchApi';
import { RentalEntity } from '@/types/Entity';
import { RentalHistory, RentalHistoryResponse } from '@/types/api/api';
import { PaginationState } from '../common/Pagination/Pagination';

/**
 * APIリクエストパラメータ（レンタル履歴）
 */
export type RentalHistoryQueryParams = {
  statuses: ("RETURNED" | "RENTED")[] | undefined;
  page: number;
  size: number;
  sortField: keyof RentalEntity;
  sortDirection: 'asc' | 'desc';
}


/**
 * レンタル履歴をGETする
 * @param rowSize // 1リクエストで取得するサイズ
 */
export function useRentalHistory(rowSize: number) {
  const RENTAL_HISTORY_PATH = useRentalHistoryPath();
  const [history, setHistory] = useState<RentalHistory[]>([]);
  const [searchParams, setSearchParams] = useState<RentalHistoryQueryParams>({
    statuses: undefined,
    page: 0,
    size: rowSize,
    sortField: 'createdAt',
    sortDirection: 'asc',
  });
  const [pageInfo, setPageInfo] = useState<PaginationState>({
    page: 0,
    size: rowSize,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  // rowSize が変わったときに検索条件を更新
  useEffect(() => {
    setSearchParams(prev => ({
      ...prev,
      size: rowSize,
      page: 0,
    }));
  }, [rowSize]);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);
      try {
        const res = await fetchApi<RentalHistoryResponse>(RENTAL_HISTORY_PATH, {
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
        setHistory(res.content ?? []);
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
        setHistory([]);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const updateQueryParams = (updater: (prev: RentalHistoryQueryParams) => RentalHistoryQueryParams) => {
    setSearchParams(prev => updater(prev));
  };

  return {
    history,
    pageInfo,
    loading,
    fetchError,
    updateQueryParams,
  };
}
