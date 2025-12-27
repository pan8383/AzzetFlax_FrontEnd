'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { RentalReturnContextType, ReturnItem } from '@/types/context/RentalReturnContext';
import { RentalHistory } from '@/types/api/api';

// Context本体（初期値は undefined）
const RentalReturnContext = createContext<RentalReturnContextType | undefined>(undefined);

// Provider コンポーネント
export function RentalReturnProvider({ children }: { children: ReactNode }) {
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);

  /** 返却リストに追加（重複防止） */
  const addToReturnItem = useCallback((history: RentalHistory) => {
    setReturnItems(prev => {
      const exists = prev.some(item => item.rentalId === history.rentalId);
      if (exists) return prev;
      return [...prev, { ...history }];
    });
  }, []);

  /** 返却リストから削除 */
  const removeFromItem = useCallback((rentalId: string) => {
    setReturnItems(prev => prev.filter(item => item.rentalId !== rentalId));
  }, []);

  /** 返却リストをクリア */
  const clearItems = useCallback(() => setReturnItems([]), []);

  return (
    <RentalReturnContext.Provider
      value={{
        returnItems,
        addToReturnItem,
        removeFromItem,
        clearItems,
      }}
    >
      {children}
    </RentalReturnContext.Provider>
  );
}

/** 返却コンテキスト用 Hook */
export function useRentalReturn() {
  const context = useContext(RentalReturnContext);
  if (!context) {
    throw new Error('useRentalReturn must be used within a RentalReturnProvider');
  }
  return context;
}
