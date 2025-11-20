import { RentalEntity } from "./Entity";

/**
 * APIリクエストパラメータ（レンタル）
 */
export type AssetsRentalParams = {
    asset_id: string;
    user_id: string;
    due_at: string;
    remarks: string;
    quantity: number;
}



export type RentalRegisterDTO = {
    assetId: string;
    quantity: number;
    due: string;
    remarks: string | null;
}