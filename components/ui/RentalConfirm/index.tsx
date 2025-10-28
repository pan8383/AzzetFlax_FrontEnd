'use client';
import { useRentalAssets } from '@/stores/rental/useRentalAssets';
import axios from 'axios';

import { RentalAsset } from 'types/assets';

export default function RentalConfirm() {
  const selectedAssets = useRentalAssets((data) => data.selectedAssets);

  const onSubmit = async (assets: RentalAsset[]) => {
    try {
      const response = await axios.post('/api/rental/register', { assets });
      console.log('送信成功:', response.data);
    } catch (error: any) {
      console.error('送信失敗:', error.message);
    }
  };

  return (
    <>
      <h2>レンタル確認</h2>
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
          {selectedAssets.map((asset) => (
            <tr key={asset.asset_id}>
              <td>{asset.asset_id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.model}</td>
              <td>{asset.stock}</td>
              <td>{asset.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => onSubmit(selectedAssets)}>確定</button>
    </>
  );
}
