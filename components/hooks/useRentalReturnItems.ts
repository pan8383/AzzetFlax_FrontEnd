'use client';

import { useState } from 'react';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import { postApi } from '@/lib/postApi';
import { ReturnItem } from '@/types/context/RentalReturnContext';
import { RentalReturnResponse } from '@/types/api/api';
import { getRentalsReturnApiPath } from './useNavigation';

export function useRentalReturnItems() {
  const { returnItems, clearItems } = useRentalReturn();
  const RENTALS_RETURN_API_PATH = getRentalsReturnApiPath();

  // 状態名をわかりやすく変更
  const [isReturning, setIsReturning] = useState(false);
  const [returnError, setReturnError] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(false);

  const postReturnItems = async () => {
    if (returnItems.length === 0) return;

    setIsReturning(true);
    setReturnError(false);
    setReturnSuccess(false);

    try {
      const res = await postApi<RentalReturnResponse, ReturnItem[]>(RENTALS_RETURN_API_PATH, returnItems);
      clearItems(); // 成功なら Context リセット
      setReturnSuccess(true);
      return res;
    } catch {
      setReturnError(true);
    } finally {
      setIsReturning(false);
    }
  };

  return { postReturnItems, isReturning, returnError, returnSuccess };
}
