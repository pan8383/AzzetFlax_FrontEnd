// hooks/useFetchAssets.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchAssets = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('/api/asset/get');
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'データ取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return { data, loading, error };
};
