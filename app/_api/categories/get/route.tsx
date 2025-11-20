import axiosInstance from '@/lib/axiosInstance';
import { CategoriesResponse } from '@/types/categories';
import axios from 'axios';

export const fetchCategories = async (): Promise<CategoriesResponse | null> => {
	try {
		const response = await axiosInstance.get<CategoriesResponse>('/categories/get');
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.warn('fetch error!!!', error.message);
		}
		return null;
	}
};
