import { create } from 'zustand';
import { SelectedlAsset } from '@/types/assets';

type DeleteState = {
  selectedAssets: SelectedlAsset[];
  setSelectedAssets: (assets: SelectedlAsset[]) => void;
  reset: () => void;
};

export const useDeleteAssets = create<DeleteState>((set) => ({
  selectedAssets: [],
  setSelectedAssets: (assets) => set({ selectedAssets: assets }),
  reset: () => set({ selectedAssets: [] }),
}));
