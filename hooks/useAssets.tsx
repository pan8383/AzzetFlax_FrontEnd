import { useState, useEffect, useCallback } from 'react';
import { fetchAssets } from '@/app/_api/asset/get/route';
import { ApiAssets, AssetsQueryParams } from '@/types/assets';
import { PaginationState } from '@/types/pagination';

export function useAssets() {
    const [searchParams, updateQueryParams] = useState<AssetsQueryParams>({
        search: '',
        page: 0,
        size: 20,
        sortField: 'assetId',
        sortDirection: 'asc',
    });

    const [assets, setAssets] = useState<ApiAssets[]>([]);
    const [pageInfo, setpageInfo] = useState<PaginationState>({
        page: 0,
        size: 20,
        totalPages: 0,
        totalElements: 0,
    });
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    // API呼び出し
    const getAssets = useCallback(async () => {
        setLoading(true);
        setFetchError(false);
        try {
            const data = await fetchAssets(searchParams);
            setAssets(data.content);
            setpageInfo({
                page: searchParams.page,
                size: searchParams.size,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
            });
        } catch {
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        getAssets();
    }, [getAssets]);

    return {
        assets,
        loading,
        fetchError,
        pageInfo,
        updateQueryParams,
    };
}
