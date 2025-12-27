import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/fetchApi';
import { Asset, AssetResponse } from '@/types/api/api';
import { PaginationState } from '../common/Pagination/Pagination';
import { useAssetsApiPath } from './useNavigation';

/**
 * APIクエリパラメータ（検索）
 */
export type AssetsQueryParams = {
  search: string;
  categoryCode: string | null;
  page: number;
  size: number;
  sortField: keyof Asset;
  sortDirection: 'asc' | 'desc';
}

export function useAssets(rowSize: number) {
  // アセット状態管理
  const [assets, setAssets] = useState<Asset[] | []>([]);

  const ASSETS_API_PATH = useAssetsApiPath();

  // クエリパラメータ状態管理
  const [searchParams, setSearchParams] = useState<AssetsQueryParams>({
    search: '',
    categoryCode: null,
    page: 0,
    size: rowSize,
    sortField: 'name',
    sortDirection: 'asc',
  });

  // ページネーション状態管理
  const [pageInfo, setPageInfo] = useState<PaginationState>({
    page: 0,
    size: rowSize,
    totalPages: 0,
    totalElements: 0,
  });

  // ローディング状態管理
  const [loading, setLoading] = useState<boolean>(true);

  // エラー状態管理
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

        const res = await fetchApi<AssetResponse>(ASSETS_API_PATH, {
          params: {
            ...(searchParams.search ? { search: searchParams.search } : {}),
            ...(searchParams.categoryCode ? { categoryCode: searchParams.categoryCode } : {}),
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

        setAssets(res.content ?? []);
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
