'use client';

import { useState, useEffect } from 'react';
import { AssetsResponse, AssetStockSummaryView } from '@/types/assets';
import { PaginationState } from '@/types/Pagination';
import { fetchApi } from '@/lib/fetchApi';
import { AssetView } from '@/types/Entity';

/**
 * APIクエリパラメータ（検索）
 */
export type AssetsQueryParams = {
  search: string;
  categoryName: string | null;
  page: number;
  size: number;
  sortField: keyof AssetView;
  sortDirection: 'asc' | 'desc';
}


export function useAssets(rowSize: number) {
  const [searchParams, setSearchParams] = useState<AssetsQueryParams>({
    search: '',
    categoryName: '',
    page: 0,
    size: rowSize,
    sortField: 'assetId',
    sortDirection: 'desc',
  });

  const [assets, setAssets] = useState<AssetStockSummaryView[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);
      try {

        const res = await fetchApi<AssetsResponse>('/assets/get', {
          params: {
            ...(searchParams.search ? { search: searchParams.search } : {}),
            ...(searchParams.categoryName ? { categoryName: searchParams.categoryName } : {}),
            page: searchParams.page,
            size: searchParams.size,
            sort: searchParams.sortField
              ? `${searchParams.sortField},${searchParams.sortDirection}`
              : undefined,
          }
        });

        if (!res) {
          setPageInfo({
            page: searchParams.page,
            size: searchParams.size,
            totalPages: 0,
            totalElements: 0,
          });
          setAssets([]);
          return;
        }

        setAssets(res.content);
        setPageInfo({
          page: searchParams.page,
          size: searchParams.size,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
        });
      } catch {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const updateQueryParams = (updater: (prev: AssetsQueryParams) => AssetsQueryParams) => {
    setSearchParams(prev => updater(prev));
  };

  return {
    assets,
    pageInfo,
    loading,
    fetchError,
    updateQueryParams,
  };
}
