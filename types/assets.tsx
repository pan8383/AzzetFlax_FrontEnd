



/**
 * APIクエリパラメータ（登録）
 */
export type AssetsRegisterParams = {
	name: string;
	category_name: string;
	model: string;
	stock: number
}



/**
 * APIレスポンス要素
 */

/**
 * APIレスポンスボディ
 */
export type AssetsResponse = {
	content: AssetStockSummaryView[];
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
};


/**
 * Entity
 */


export type AssetStockSummaryView = {
	assetId: string;
	name: string;
	categoryName: string;
	model: string;
	manufacturer: string;
	isAvailable: boolean;
	totalStock: number;
	availableStock: number;
};