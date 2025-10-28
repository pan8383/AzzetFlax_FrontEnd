import { useState, useEffect, useCallback } from 'react';
import { fetchAssets } from '@/app/_api/assets/get/route';
import { ApiAssets, AssetsEntity, AssetsQueryParams } from '@/types/assets';
import { PaginationState } from '@/types/pagination';

export function useAssets() {
    const [searchParams, updateQueryParams] = useState<AssetsQueryParams>({
        search: '',
        page: 0,
        size: 20,
        sortField: 'assetId',
        sortDirection: 'asc',
    });

    const [assets, setAssets] = useState<AssetsEntity[]>([]);
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
            const mappedAssets: AssetsEntity[] = data.content.map(a => ({
                assetId: a.asset_id,
                name: a.name,
                category: a.category,
                model: a.model,
                stock: a.stock,
                createdAt: a.created_at,
                updatedAt: a.updated_at,
            }));
            setAssets(mappedAssets);
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
