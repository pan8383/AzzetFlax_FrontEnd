import { RentalUnitStatus } from "./api/api";

/**
 * enum
 * PROCESSING, // 処理中（IDの払い出し）
 * RENTED, // 全ユニット貸出成功
 * PARTIAL, // 一部成功・一部失敗
 * RETURNED, // 全返却済み
 * LOST, // 紛失
 * BROKEN, // 破損
 * FAILED; // 全件失敗（在庫不足など）
 */
export type RentalStatus = 'PROCESSING' | 'RENTED' | 'PARTIAL' | 'RETURNED' | 'LOST' | 'BROKEN' | 'FAILED';


export const rentalStatusLabelMap: Record<RentalStatus, string> = {
  PROCESSING: '処理中',
  RENTED: 'レンタル中',
  PARTIAL: '一部返却',
  RETURNED: '返却済み',
  LOST: '紛失',
  BROKEN: '破損',
  FAILED: '失敗',
};

export const rentalUnitStatusLabelMap: Record<RentalUnitStatus, string> = {
  RENTING: 'レンタル中',
  RETURNED: '返却済み',
  CANCELLED: 'キャンセル',
};
