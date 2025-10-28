'use client';

import { useEffect, useState } from 'react';
import { fetchCategories } from '../_api/categories/get/route';
import { CategoriesResponseDTO } from 'types/categories';
import styles from './page.module.css';

export default function Home() {
	// カテゴリ一覧
	const [categories, setCategories] = useState<CategoriesResponseDTO[]>([]);
	// 選択中のカテゴリ
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	// ローディング状態
	const [loading, setLoading] = useState<boolean>(true);
	// エラー状態
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchCategories();
				setCategories(data);
				// 初期選択は最初のカテゴリにする
				if (data.length > 0) setSelectedCategory(data[0].name);
			} catch (err: any) {
				console.error(err);
				setError('カテゴリの取得に失敗しました');
			} finally {
				setLoading(false);
			}
		};

		loadCategories();
	}, []);

	if (loading) return <p>読み込み中...</p>;
	if (error) return <p style={{ color: 'red' }}>{error}</p>;

	return (
		<div className={styles.container}>
			<label htmlFor="categorySelect">カテゴリを選択:</label>
			<select
				id="categorySelect"
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
			>
				{categories.map((e) => (
					<option key={e.name} value={e.name}>
						{e.name}
					</option>
				))}
			</select>
			<p>選択中: {selectedCategory}</p>
		</div>
	);
}
