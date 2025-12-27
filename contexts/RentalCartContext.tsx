'use client';
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { CartContextType, CartItem } from '@/types/context/RentalCartContextTypes';
import { AssetEntity } from '@/types/api/entities';

// Context本体を定義（初期値はundefined）
const RentalCartContext = createContext<CartContextType | undefined>(undefined);

// Providerコンポーネント
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // カート内の種類の数
  const totalTypes = cartItems.length;

  // 全アイテム数量の合計
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * カートに商品を追加
   */
  const addToCart = useCallback((asset: AssetEntity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.assetId === asset.assetId);
      const availableStock = asset.availableStock;

      if (existing) {
        // 在庫数を超えていれば追加しない
        if (existing.quantity >= availableStock) {
          alert('これ以上追加できません（在庫上限）');
          return prev;
        }
        // 既存アイテムの数量を+1
        return prev.map(item =>
          item.assetId === asset.assetId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // 新規追加
      return [...prev, { ...asset, quantity: 1 }];
    });
  }, []);

  /**
   * カートから削除
   */
  const removeFromCart = useCallback((assetId: string) => {
    setCartItems(prev => prev.filter(item => item.assetId !== assetId));
  }, []);

  /**
   * 数量を1増やす
   */
  const increaseQuantity = useCallback((assetId: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.assetId === assetId
          ? item.quantity < (item.availableStock ?? 0)
            ? { ...item, quantity: item.quantity + 1 }
            : item // 在庫上限を超えない
          : item
      )
    );
  }, []);

  /**
   * 数量を1減らす（0になったら削除）
   */
  const decreaseQuantity = useCallback((assetId: string) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.assetId === assetId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  /**
   * カートを空にする
   */
  const clearCart = useCallback(() => setCartItems([]), []);

  return (
    <RentalCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalTypes,
        totalQuantity,
      }}
    >
      {children}
    </RentalCartContext.Provider>
  );
}

/**
 * useCart Hook
 * Contextを安全に利用するためのカスタムフック
 */
export function useCart() {
  const context = useContext(RentalCartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
