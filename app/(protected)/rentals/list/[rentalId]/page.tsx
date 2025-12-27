'use client';

import TableTitleButton from '@/components/common/TableTitleButton';
import styles from './page.module.css';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import { fetchApi } from '@/lib/fetchApi';
import { ApiResponse } from '@/types/api/ApiResponse';
import { useRentalHistoryPath } from '@/components/hooks/useNavigation';
import React, { useEffect, useState } from 'react';

type PageProps = {
  params: Promise<{
    rentalId: string;
  }>;
};

export type RentalHistoryDetail = {
  rentalId: string;
  assetId: string;
  unitId: string;
  name: string;
  model: string;
  manufacturer: string;
  due: string;
  returnAt: string | null;
  statusCode: string;
  remarks: string;
  createdAt: string;
};

type RentalHistoryDetailResponse = ApiResponse<RentalHistoryDetail>;

export default function RentalHistoryDetail({ params }: PageProps) {
  const { rentalId } = React.use(params);

  const RENTAL_HISTORY_PATH = useRentalHistoryPath();
  const [data, setData] = useState<RentalHistoryDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);
      try {
        const res = await fetchApi<RentalHistoryDetailResponse>(`${RENTAL_HISTORY_PATH}/${rentalId}`);
        setData(res.data ?? null);
      } catch {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [rentalId, RENTAL_HISTORY_PATH]);

  if (loading) return <div>読み込み中...</div>;
  if (fetchError || !data) return <div>データの取得に失敗しました。</div>;

  return (
    <div className={styles.pageContainer}>
      <TableTitleButton
        label="レンタル履歴"
        icon={<Grid2x2Icon stroke="var(--primary)" />}
        disabled
      />

      <table className={styles.detailTable}>
        <tbody>
          <tr><th>レンタルID</th><td>{data.rentalId}</td></tr>
          <tr><th>資産ID</th><td>{data.assetId}</td></tr>
          <tr><th>ユニットID</th><td>{data.unitId}</td></tr>
          <tr><th>名称</th><td>{data.name}</td></tr>
          <tr><th>型番</th><td>{data.model}</td></tr>
          <tr><th>メーカー</th><td>{data.manufacturer}</td></tr>
          <tr><th>期限</th><td>{data.due}</td></tr>
          <tr><th>返却日</th><td>{data.returnAt ?? '-'}</td></tr>
          <tr><th>ステータス</th><td>{data.statusCode}</td></tr>
          <tr><th>備考</th><td>{data.remarks}</td></tr>
          <tr><th>レンタル日</th><td>{data.createdAt}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
