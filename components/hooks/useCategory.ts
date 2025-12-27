import { fetchApi } from "@/lib/fetchApi";
import { useCallback, useEffect, useState } from "react";
import { useCategoryListPath } from "./useNavigation";
import { Category, CategoryResponse } from "@/types/api/api";


/**
 * カテゴリーを取得する
 */
export function useCategory() {
  const CATEGORY_LIST_PATH = useCategoryListPath();
  const [category, setcategory] = useState<Category[]>([]);
  const [categoryLoading, setcategoryLoading] = useState<boolean>(true);
  const [categoryFetchError, setcategoryFetchError] = useState<boolean>(false);

  const fetchData = useCallback(
    async () => {
      setcategoryLoading(true);
      setcategoryFetchError(false);

      try {
        const res = await fetchApi<CategoryResponse>(CATEGORY_LIST_PATH);
        setcategory(res.data ?? []);
      } catch (err) {
        setcategoryFetchError(true);
      } finally {
        setcategoryLoading(false);
      }
    }, [CATEGORY_LIST_PATH]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    category,
    categoryLoading,
    categoryFetchError,
    refetch: fetchData,
  };
}
