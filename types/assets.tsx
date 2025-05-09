export type Asset = {
  asset_id: string;
  name: string;
  category: string;
  model: string;
  stock: number;
};

export type RentalAsset = Asset & {
  count: number;
};

export type SelectedlAsset = Asset & {
  selected: boolean;
};
