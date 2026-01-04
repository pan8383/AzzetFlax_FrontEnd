import { useState, useEffect } from 'react';
import { getApi } from '@/lib/getApi';
import { AssetResponse, User, UsersResponse } from '@/types/api/api';
import { PaginationState } from '../common/Pagination/Pagination';
import { error } from 'console';
import { getUsersApiPath } from './useNavigation';

/**
 * APIクエリパラメータ（検索）
 */
type UsersQueryParams = {
  search: string;
  page: number;
  size: number;
  sortField: keyof User;
  sortDirection: 'asc' | 'desc';
}

export function useUsers(rowSize: number) {
  const USERS_API_PATH = getUsersApiPath();
  // ユーザー状態管理
  const [users, setUsers] = useState<User[] | []>([]);

  // クエリパラメータ状態管理
  const [searchParams, setSearchParams] = useState<UsersQueryParams>({
    search: '',
    page: 0,
    size: rowSize,
    sortField: 'createdAt',
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
        const res = await getApi<UsersResponse>(USERS_API_PATH, {
          params: {
            ...(searchParams.search ? { search: searchParams.search } : {}),
            page: searchParams.page,
            size: searchParams.size,
            sort: searchParams.sortField
              ? `${searchParams.sortField},${searchParams.sortDirection}`
              : undefined,
          }
        });

        // 取得できなかった場合
        if (!res) {
          setPageInfo({
            page: searchParams.page,
            size: searchParams.size,
            totalPages: 0,
            totalElements: 0,
          });
          setUsers([]);
          return;
        }

        setUsers(res.content ?? []);
        setPageInfo({
          page: searchParams.page,
          size: searchParams.size,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
        });
      } catch (err: any) {
        throw new Error();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const updateQueryParams = (updater: (prev: UsersQueryParams) => UsersQueryParams) => {
    setSearchParams(prev => updater(prev));
  };

  return {
    users,
    pageInfo,
    loading,
    fetchError,
    updateQueryParams,
  };
}
