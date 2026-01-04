import { RentalCreateResultRow } from "@/app/(protected)/rentals/_components/RentalResultTableView";
import { RentalCreateResult } from "@/types/api/api";

export function flattenRentalResults(
  datas: RentalCreateResult
): RentalCreateResultRow[] {
  return datas.assetResponses.flatMap(asset =>
    asset.units.map(unit => ({
      rentalId: datas.rentalId,
      assetId: asset.assetId,
      unitId: unit.unitId,
      success: unit.success,
      errorMessage: unit.errorMessage,
    }))
  );
}
