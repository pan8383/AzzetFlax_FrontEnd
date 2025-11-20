'use client';

import { useState, useEffect } from 'react';
import { PaginationState } from '@/types/Pagination';
import { useRentalHistoryPath } from './useNavigation';
import { fetchApi } from '@/lib/fetchApi';
import { PageResponse } from '@/types/ApiResponse';
import { RentalEntity } from '@/types/Entity';

/**
 * APIリクエストパラメータ（レンタル履歴）
 */
export type RentalHistoryQueryParams = {
  // search: string; キーワード検索を実装する場合
  page: number;
  size: number;
  sortField: keyof RentalEntity;
  sortDirection: 'asc' | 'desc';
}

/**
 * レンタル履歴
 */
export type RentalHistory = {
  rentalId: string;
  assetId: string;
  unitId: string;
  due: string;
  remarks: string;
  returnAt: string | null;
  statusCode: string;
  createdAt: string;
}

/**
 * レンタル履歴のページャーレスポンスエンティティ
 */
export type RentalHistoryResponse = PageResponse<RentalHistory>;

/**
 * レンタル履歴をPOSTする
 * @param rowSize 
 * @returns 
 */
export function useRentalHistory(rowSize: number) {
  const RENTAL_HISTORY_PATH = useRentalHistoryPath();
  const [histories, setHistories] = useState<RentalHistory[]>([]);
  const [searchParams, setSearchParams] = useState<RentalHistoryQueryParams>({
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
            page: searchParams.page,
            size: searchParams.size,
            sort: searchParams.sortField
              ? `${searchParams.sortField},${searchParams.sortDirection}`
              : undefined,
          }
        });

        // レスポンスデータを取り出してsteteに追加
        setHistories(res.content ?? []);
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
        setHistories([]);
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
    histories,
    pageInfo,
    loading,
    fetchError,
    updateQueryParams,
  };
}
