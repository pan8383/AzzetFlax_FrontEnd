import { create } from 'zustand';
import { RentalAsset } from '@/types/assets';

type RentalState = {
  selectedAssets: RentalAsset[];
  setSelectedAssets: (assets: RentalAsset[]) => void;
  reset: () => void;
};

export const useRentalAssets = create<RentalState>((set) => ({
  selectedAssets: [],
  setSelectedAssets: (assets) => set({ selectedAssets: assets }),
  reset: () => set({ selectedAssets: [] }),
}));
