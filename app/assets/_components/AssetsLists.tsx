'use client';

import { useState } from 'react';
import Pagination from '@/components/common/Pagination/Pagination';
import { AssetsEntity } from '@/types/assets';
import styles from './AssetsList.module.css';
import { useAssets } from '@/components/hooks/useAssets';

export default function AssetsLists() {
    const { assets, loading, fetchError, pageInfo, updateQueryParams } = useAssets();
    const [searchKeyword, setsearchKeyword] = useState('');

    const onSearch = () => {
        updateQueryParams(prev => ({ ...prev, search: searchKeyword, page: 0 }));
    };

    const onSort = (field: keyof AssetsEntity) => {
        updateQueryParams(prev => ({
            ...prev,
            sortField: field,
            sortDirection: prev.sortField === field && prev.sortDirection === 'asc' ? 'desc' : 'asc',
            page: 0,
        }));
    };

    if (loading) return <div className={styles.container}>読み込み中...</div>;
    if (fetchError) return <div className={styles.container}>データ取得エラー...</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>資産一覧</h2>

            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    placeholder="検索"
                    className={styles.searchKeyword}
                    value={searchKeyword}
                    onChange={e => setsearchKeyword(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') onSearch();
                    }}
                />
                <button className={styles.searchButton} onClick={onSearch} disabled={loading}>
                    検索
                </button>
            </div>

            <p>{pageInfo.totalElements} 件</p>

            <Pagination
                currentPage={pageInfo.page + 1}
                totalPages={pageInfo.totalPages}
                onPageChange={newPage =>
                    updateQueryParams(prev => ({ ...prev, page: newPage - 1 }))
                }
            />

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th} onClick={() => onSort('assetId')}>ID</th>
                        <th className={styles.th} onClick={() => onSort('name')}>名前</th>
                        <th className={styles.th} onClick={() => onSort('category')}>カテゴリ</th>
                        <th className={styles.th} onClick={() => onSort('model')}>モデル</th>
                        <th className={styles.th} onClick={() => onSort('stock')}>在庫</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map(asset => (
                        <tr key={asset.asset_id}>
                            <td className={styles.td}>{asset.asset_id}</td>
                            <td className={styles.td}>{asset.name}</td>
                            <td className={styles.td}>{asset.category}</td>
                            <td className={styles.td}>{asset.model}</td>
                            <td className={styles.td}>{asset.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={pageInfo.page + 1}
                totalPages={pageInfo.totalPages}
                onPageChange={newPage =>
                    updateQueryParams(prev => ({ ...prev, page: newPage - 1 }))
                }
            />
        </div>
    );
}
