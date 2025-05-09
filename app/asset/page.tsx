'use client';

import { useEffect, useState } from 'react';
import { useDeleteAssets } from '@/stores/asset/useDeleteAssets';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { SelectedlAsset } from '@/types/assets';
import Image from 'next/image';
import reload from '@/public/reload.svg';

export default function Loan() {
  const router = useRouter();
  const [assets, setAssets] = useState<SelectedlAsset[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  // APIでデータ取得
  const fetchAssets = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/asset/get');
      if (response.status === 200) {
        const withSelected = response.data.map((asset: SelectedlAsset) => ({ ...asset, selected: false }));
        setAssets(withSelected);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('api error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const toggleAll = () => {
    const selectState = !allSelected;
    setAssets((prevAssets) => prevAssets.map((asset) => ({ ...asset, selected: selectState })));
    setAllSelected(selectState);
  };

  const toggleOne = (id: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => (asset.asset_id === id ? { ...asset, selected: !asset.selected } : asset))
    );
  };

  const handleDelete = () => {
    const deleteOnly = assets.filter((asset) => asset.selected === true);
    if (deleteOnly) {
      useDeleteAssets.getState().setSelectedAssets(deleteOnly);
      router.push('/asset/delete/confirm');
    } else {
      alert('削除するアイテムが選択されていません');
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <>
      <button onClick={fetchAssets}>
        <Image alt="reload" src={reload} width={30} height={30} />
      </button>
      <button onClick={handleDelete}>削除</button>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            </th>
            <th>ID</th>
            <th>名前</th>
            <th>種類</th>
            <th>型番</th>
            <th>在庫</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.asset_id}>
              <td>
                <input type="checkbox" checked={asset.selected} onChange={() => toggleOne(asset.asset_id)} />
              </td>
              <td>{asset.asset_id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.model}</td>
              <td>{asset.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
