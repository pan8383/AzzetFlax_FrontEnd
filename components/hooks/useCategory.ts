import { getApi } from "@/lib/getApi";
import { useCallback, useEffect, useState } from "react";
import { Category, CategoryResponse } from "@/types/api/api";
import { getCategoryListApiPath } from "./useNavigation";

export function useCategory() {
  const CATEGORY_LIST_API_PATH = getCategoryListApiPath();
  const [category, setcategory] = useState<Category[]>([]);
  const [categoryLoading, setcategoryLoading] = useState<boolean>(true);
  const [categoryFetchError, setcategoryFetchError] = useState<boolean>(false);

  const fetchData = useCallback(
    async () => {
      setcategoryLoading(true);
      setcategoryFetchError(false);

      try {
        const res = await getApi<CategoryResponse>(CATEGORY_LIST_API_PATH);
        setcategory(res.data ?? []);
      } catch (err) {
        setcategoryFetchError(true);
      } finally {
        setcategoryLoading(false);
      }
    }, [CATEGORY_LIST_API_PATH]);

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
