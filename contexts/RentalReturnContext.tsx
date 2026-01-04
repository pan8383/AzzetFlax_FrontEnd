'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { RentalReturnResponse } from '@/types/api/api';
import { patchApi } from '@/lib/patchApi';
import { getRentalsReturnApiPath } from '@/components/hooks/useNavigation';

export type ReturnItem = {
  rentalId: string;
  rentalUnitIds: string[];
};

export type RentalReturnContextType = {
  returnItems: ReturnItem[];

  addToReturnItem: (rentalId: string, rentalUnitId: string) => void;
  removeFromItem: (rentalId: string, rentalUnitId: string) => void;
  clearItems: () => void;

  executeReturn: () => Promise<RentalReturnResponse | undefined>;
  isReturning: boolean;
  returnError: boolean;
  returnSuccess: boolean;
};

// Context
const RentalReturnContext = createContext<RentalReturnContextType | undefined>(undefined);

// Provider
export function RentalReturnProvider({ children }: { children: ReactNode }) {
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);

  const [isReturning, setIsReturning] = useState(false);
  const [returnError, setReturnError] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(false);

  /**
   * Unit 追加
   */
  const addToReturnItem = useCallback((rentalId: string, rentalUnitId: string) => {
    setReturnItems(prev => {
      const target = prev.find(item => item.rentalId === rentalId);

      if (!target) {
        return [...prev, { rentalId, rentalUnitIds: [rentalUnitId] }];
      }

      if (target.rentalUnitIds.includes(rentalUnitId)) {
        return prev;
      }

      return prev.map(item =>
        item.rentalId === rentalId
          ? { ...item, rentalUnitIds: [...item.rentalUnitIds, rentalUnitId] }
          : item
      );
    });
  }, []);

  /**
   * Unit 削除
   */
  const removeFromItem = useCallback((rentalId: string, rentalUnitId: string) => {
    setReturnItems(prev =>
      prev
        .map(item =>
          item.rentalId === rentalId
            ? {
              ...item,
              rentalUnitIds: item.rentalUnitIds.filter(id => id !== rentalUnitId),
            }
            : item
        )
        .filter(item => item.rentalUnitIds.length > 0)
    );
  }, []);

  const clearItems = useCallback(() => {
    setReturnItems([]);
  }, []);

  /**
   * 返却実行
   */
  const executeReturn = useCallback(async () => {
    if (returnItems.length === 0) return;

    setIsReturning(true);
    setReturnError(false);
    setReturnSuccess(false);

    try {
      const res = await patchApi<RentalReturnResponse, ReturnItem[]>(getRentalsReturnApiPath(), returnItems);
      clearItems();
      setReturnSuccess(true);
      return res;
    } catch (e) {
      setReturnError(true);
    } finally {
      setIsReturning(false);
    }
  }, [returnItems, clearItems, getRentalsReturnApiPath]);

  return (
    <RentalReturnContext.Provider
      value={{
        returnItems,
        addToReturnItem,
        removeFromItem,
        clearItems,
        executeReturn,
        isReturning,
        returnError,
        returnSuccess,
      }}
    >
      {children}
    </RentalReturnContext.Provider>
  );
}

// Hook
export function useRentalReturn() {
  const context = useContext(RentalReturnContext);
  if (!context) {
    throw new Error('useRentalReturn must be used within a RentalReturnProvider');
  }
  return context;
}
