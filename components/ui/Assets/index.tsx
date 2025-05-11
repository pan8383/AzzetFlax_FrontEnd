'use client';

import { useEffect, useState } from 'react';
import { useDeleteAssets } from '@/stores/asset/useDeleteAssets';
import { useNavigateAssetsRegister, useNavigateAssetsDeleteConfirm } from '@/components/hooks/useNavigation';
import axios from 'axios';

import { SelectedlAsset } from '@/types/assets';
import styles from './Assets.module.css';

export default function Assets() {
  const [assets, setAssets] = useState<SelectedlAsset[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  // API
  const fetchAssets = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/asset/get');
      if (response.status === 200) {
        const withSelected = response.data.map((asset: SelectedlAsset) => ({ ...asset, selected: false }));
        setAssets(withSelected);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API ERROR:', error.response?.data || error.message);
      } else {
        console.error('SERVER ERROR:', error);
      }
    }
  };

  const selectAll = () => {
    const selectState = !allSelected;
    setAssets((prevAssets) => prevAssets.map((asset) => ({ ...asset, selected: selectState })));
    setAllSelected(selectState);
  };

  const selectOne = (id: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => (asset.asset_id === id ? { ...asset, selected: !asset.selected } : asset))
    );
  };

  const handleDelete = () => {
    const deleteOnly = assets.filter((asset) => asset.selected === true);
    if (deleteOnly) {
      useDeleteAssets.getState().setSelectedAssets(deleteOnly);
      useNavigateAssetsDeleteConfirm();
    } else {
      alert('削除する資材が選択されていません');
    }
  };

  const handleRegister = () => {
    useNavigateAssetsRegister();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <>
      <button onClick={fetchAssets}>
        <span className={styles.reload}></span>
      </button>
      <button className={styles.button} onClick={handleRegister}>
        登録
      </button>
      <button className={styles.button} onClick={handleDelete}>
        削除
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={allSelected} onChange={selectAll} />
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
                <input type="checkbox" checked={asset.selected} onChange={() => selectOne(asset.asset_id)} />
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
