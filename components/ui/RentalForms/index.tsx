'use client';

import { useEffect, useState } from 'react';
import { useRentalAssets } from '@/stores/rental/useRentalAssets';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Asset, RentalAsset } from 'types/assets';
import Image from 'next/image';
import reload from '@/public/reload.svg';

export default function Loan() {
  const [assets, setAssets] = useState<RentalAsset[]>([]);
  const router = useRouter();

  // APIでデータ取得
  const fetchAssets = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/assets/get');
      if (response.status === 200) {
        const datas: RentalAsset[] = response.data.map((asset: Asset) => ({
          ...asset,
          count: 0,
        }));
        setAssets(datas);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('api error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  // 初回レンダリング時にデータを取得
  useEffect(() => {
    fetchAssets();
  }, []);

  const handleCountDown = (id: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.asset_id === id ? { ...asset, count: asset.count > 0 ? asset.count - 1 : 0 } : asset
      )
    );
  };

  const handleCountUp = (id: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.asset_id === id ? { ...asset, count: asset.count < asset.stock ? asset.count + 1 : asset.count } : asset
      )
    );
  };

  const handleCountReset = (id: string) => {
    setAssets((prevAssets) => prevAssets.map((asset) => (asset.asset_id === id ? { ...asset, count: 0 } : asset)));
  };

  const handleRental = () => {
    const rentalOnly = assets.filter((asset) => asset.count >= 1);
    if (rentalOnly.length >= 1) {
      useRentalAssets.getState().setSelectedAssets(rentalOnly);
      router.push('/rental/confirm');
    } else {
      alert('レンタルするアイテムが選択されていません');
    }
  };

  return (
    <>
      <button onClick={fetchAssets}>
        <Image alt="reload" src={reload} width={30} height={30} />
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>種類</th>
            <th>型番</th>
            <th>在庫</th>
            <th>レンタル</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.asset_id}>
              <td>{asset.asset_id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.model}</td>
              <td>{asset.stock}</td>
              <td>
                <button onClick={() => handleCountDown(asset.asset_id)} disabled={asset.count === 0}>
                  -
                </button>
                {asset.count}
                <button onClick={() => handleCountUp(asset.asset_id)} disabled={asset.count === asset.stock}>
                  +
                </button>
                <button onClick={() => handleCountReset(asset.asset_id)}>リセット</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleRental()}>確認</button>
    </>
  );
}
