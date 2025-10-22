import axiosInstance from '@/lib/axiosInstance';
import { AssetsQueryParams, AssetsResponse } from '@/types/assets';

export const fetchAssets = async ({
	search,
	page,
	size,
	sortField,
	sortDirection
}: AssetsQueryParams) => {
	try {
		const response = await axiosInstance.get<AssetsResponse>('/assets/get', {
			params: {
				...(search ? { search } : {}),
				page,
				size,
				sort: sortField ? `${sortField},${sortDirection}` : undefined,
			}
		});

		// API型 → フロント型に変換
		return {
			...response.data,
			content: response.data.content.map(a => ({ ...a, selected: false }))
		};
	} catch (error: any) {
		console.error('fetchData error:', error);
		throw new Error('データの取得に失敗しました');
	}
};