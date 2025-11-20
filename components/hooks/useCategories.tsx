import { fetchCategories } from "@/app/_api/categories/get/route";
import { CategoriesResponseDTO } from "@/types/categories";
import { useEffect, useState } from "react";

export function useCategories() {
    const [categories, setCategories] = useState<CategoriesResponseDTO[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [categoriesFetchError, setCategoriesFetchError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setCategoriesLoading(true);
            setCategoriesFetchError(false);

            try {
                const data = await fetchCategories();
                setCategories(data || []);
            } catch (err) {
                setCategoriesFetchError(true);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        categories,
        categoriesLoading,
        categoriesFetchError,
        refetch: fetchCategories,
    };
}
