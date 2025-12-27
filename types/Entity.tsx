

export type AssetView = {
  assetId: string;
  name: string;
  categoryName: string;
  model: string;
  manufacturer: string;
  isAvailable: boolean;
  totalStock: number;
  availableStock: number;
};

export type RentalEntity = {
  rentalId: string;
  assetId: string;
  unitId: string;
  userId: string;
  due: Date;
  returnAt: Date;
  status: string;
  remarks: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};