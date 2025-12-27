'use client';

import { useState } from 'react';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import { useRentalReturnPath } from './useNavigation';
import { postApi } from '@/lib/postApi';
import { ReturnItem } from '@/types/context/RentalReturnContext';
import { RentalReturnResponse } from '@/types/api/api';

export function useRentalReturnItems() {
  const { returnItems, clearItems } = useRentalReturn();
  const RENTAL_RETURN_PATH = useRentalReturnPath();

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
      const res = await postApi<RentalReturnResponse, ReturnItem[]>(RENTAL_RETURN_PATH, returnItems);
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
