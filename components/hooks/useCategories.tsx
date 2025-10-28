import axiosInstance from "@/lib/axiosInstance";
import { CategoriesResponse, CategoriesResponseDTO } from "@/types/categories";
import { AxiosError } from "axios";
import { useEffect, useState, useCallback } from "react";

export function useCategories() {
    const [categories, setCategories] = useState<CategoriesResponseDTO[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [categoriesFetchError, setCategoriesFetchError] = useState<string>("");

    const fetchCategories = useCallback(async () => {
        setCategoriesLoading(true);
        setCategoriesFetchError("");

        try {
            const response = await axiosInstance.get<CategoriesResponse>("/categories/get");
            setCategories(response.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                const apiError = err.response?.data?.error;
                setCategoriesFetchError(apiError?.message || "サーバーエラーが発生しました");
            } else {
                setCategoriesFetchError("サーバーエラーが発生しました");
            }
        } finally {
            setCategoriesLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        categoriesFetchError,
        categoriesLoading,
        refetch: fetchCategories,
    };
}
