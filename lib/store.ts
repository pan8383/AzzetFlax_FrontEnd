import { create } from 'zustand';
import { AssetUnitDetail } from '@/types/api/api';

type Store = {
  selectedUnit: AssetUnitDetail | null;
  setSelectedUnit: (unit: AssetUnitDetail) => void;
};

export const useStore = create<Store>((set) => ({
  selectedUnit: null,
  setSelectedUnit: (unit) => set({ selectedUnit: unit }),
}));
