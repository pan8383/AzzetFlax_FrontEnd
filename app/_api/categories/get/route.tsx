import axiosInstance from '@/lib/axiosInstance';
import { CategoriesResponse } from '@/types/categories';

export const fetchCategories = async (): Promise<CategoriesResponse> => {
	try {
		const response = await axiosInstance.get<CategoriesResponse>('/categories/get');
		return response.data;
	} catch (error: any) {
		console.error('fetchCategories error:', error);
		throw new Error('データの取得に失敗しました');
	}
};
