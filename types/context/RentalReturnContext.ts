import { RentalHistory } from "../api/api";
import { AssetEntity } from "../api/entities";

// ==============================
// RentalReturnContext
// ==============================


export type ReturnItem = {
  rentalId: string;
  unitId: string;
}

// Contextが提供する機能の型定義
export type RentalReturnContextType = {
  returnItems: ReturnItem[];
  addToReturnItem: (history: RentalHistory) => void;
  removeFromItem: (rentalId: string) => void;
  clearItems: () => void;
};