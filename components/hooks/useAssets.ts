import { useState, useEffect } from 'react';
import { getApi } from '@/lib/getApi';
import { Asset, AssetResponse } from '@/types/api/api';
import { PaginationState } from '../common/Pagination/Pagination';
import { getAssetsApiPath } from './useNavigation';

export type AssetsQueryParams = {
  search: string;
  categoryCode: string | null;
  page: number;
  size: number;
  sortField: keyof Asset;
  sortDirection: 'asc' | 'desc';
}

export function useAssets(rowSize: number) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchParams, setSearchParams] = useState<AssetsQueryParams>({
    search: '',
    categoryCode: null,
    page: 0,
    size: rowSize,
    sortField: 'name',
    sortDirection: 'desc',
  });

  const [pageInfo, setPageInfo] = useState<PaginationState>({
    page: 0,
    size: rowSize,
    totalPages: 0,
    totalElements: 0,
  });

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const ASSETS_API_PATH = getAssetsApiPath();

  const fetchData = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await getApi<AssetResponse>(ASSETS_API_PATH, {
        params: {
          ...(searchParams.search ? { search: searchParams.search } : {}),
          ...(searchParams.categoryCode ? { categoryCode: searchParams.categoryCode } : {}),
          page: searchParams.page,
          size: searchParams.size,
          sort: `${searchParams.sortField},${searchParams.sortDirection}`,
        }
      });

      setAssets(res?.content ?? []);
      setPageInfo({
        page: searchParams.page,
        size: searchParams.size,
        totalPages: res?.totalPages ?? 0,
        totalElements: res?.totalElements ?? 0,
      });
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    searchParams.search,
    searchParams.categoryCode,
    searchParams.sortField,
    searchParams.sortDirection,
    searchParams.size,
    searchParams.page,
  ]);

  const updateQueryParams = (updater: (prev: AssetsQueryParams) => AssetsQueryParams) => {
    setSearchParams(prev => updater(prev));
  };

  return {
    assets,
    pageInfo,
    loading,
    fetchError,
    searchParams,
    updateQueryParams,
    refetch: fetchData,
  };
}
