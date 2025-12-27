
// ==============================
// RentalCartContextTypes
// ==============================

import { AssetEntity } from "../api/entities";

// カートに入れるアイテムの型（数量情報を追加）
export type CartItem = AssetEntity & { quantity: number };

// Contextが提供する機能の型定義
export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (asset: AssetEntity) => void;
  removeFromCart: (assetId: string) => void;
  increaseQuantity: (assetId: string) => void;
  decreaseQuantity: (assetId: string) => void;
  clearCart: () => void;
  totalTypes: number;  // カート内の種類の数
  totalQuantity: number; // 全アイテム数量の合計
};