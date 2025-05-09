'use client';
import axios from 'axios';

import { Asset } from '@/types/assets';
import { useDeleteAssets } from '@/stores/asset/useDeleteAssets';

export default function ConfirmPage() {
  const selectedAssets = useDeleteAssets((data) => data.selectedAssets);

  const onSubmit = async (assets: Asset[]) => {
    try {
      const response = await axios.post('/api/asset/delete', { assets });
      console.log('送信成功:', response.data);
    } catch (error: any) {
      console.error('送信失敗:', error.message);
    }
  };

  return (
    <>
      <h2>削除確認</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>種類</th>
            <th>型番</th>
            <th>在庫</th>
          </tr>
        </thead>
        <tbody>
          {selectedAssets.map((asset) => (
            <tr key={asset.asset_id}>
              <td>{asset.asset_id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.model}</td>
              <td>{asset.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => onSubmit(selectedAssets)}>確定</button>
    </>
  );
}
