import axios from 'axios';
import { Asset } from 'types/assets';
import { useDeleteAssets } from '@/stores/asset/useDeleteAssets';
import React, { useState } from 'react';
import ConfirmModal from 'components/ui/ConfirmModal';
import { useRouter } from 'next/navigation';

export default function DeleteAssetConfirm() {
  const router = useRouter();
  const selectedAssets = useDeleteAssets((data) => data.selectedAssets);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('/api/asset/delete', { selectedAssets });
      console.log(response.status);
      router.push('/asset');
    } catch (error: any) {
      console.error('送信失敗:', error.message);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const openConfirmModal = () => {
    setIsOpen(true);
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

      <button onClick={openConfirmModal}>確定</button>

      <ConfirmModal
        isOpen={isOpen}
        message="このアイテムを本当に削除しますか？"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
