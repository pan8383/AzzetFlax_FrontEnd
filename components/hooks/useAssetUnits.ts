import { useState, useEffect, useCallback } from 'react';
import { getApi } from '@/lib/getApi';
import { AssetUnitDetail, AssetUnitResponse } from '@/types/api/api';
import { getAssetUnitsApiPath } from './useNavigation';

export function useAssetUnits(assetId: string) {
  // 状態管理
  const [assetUnits, setAssetUnits] = useState<AssetUnitDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchAssetUnits = useCallback(async () => {
    setLoading(true);
    setFetchError(false);

    try {
      const res = await getApi<AssetUnitResponse>(getAssetUnitsApiPath(assetId));
      if (!res) {
        setAssetUnits([]);
        return;
      }

      setAssetUnits(res.data ?? []);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [getAssetUnitsApiPath(assetId)]);

  useEffect(() => {
    fetchAssetUnits();
  }, [fetchAssetUnits]);

  return {
    assetUnits,
    loading,
    fetchError,
    refetch: fetchAssetUnits,
  };
}
