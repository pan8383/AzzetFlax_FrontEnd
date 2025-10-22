

/**
 * APIクエリパラメータ（検索）
 */
export type AssetsQueryParams = {
	search: string;
	page: number;
	size: number;
	sortField: keyof AssetsEntity;
	sortDirection: 'asc' | 'desc';
}

/**
 * APIクエリパラメータ（登録）
 */
export type AssetsRegisterParams = {
	name: string;
	category: string;
	model: string;
	stock: number
}

/**
 * APIレスポンス要素
 */
export type ApiAssets = {
	asset_id: string;
	name: string;
	category: string;
	model: string;
	stock: number;
	created_at: string;
	updated_at: string;
};

/**
 * APIレスポンスボディ
 */
export type AssetsResponse = {
	content: ApiAssets[];
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
};


/**
 * model（バック）
 */
export type AssetsEntity = {
	assetId: string;
	name: string;
	category: string;
	model: string;
	stock: number;
	createdAt: string;
	updatedAt: string;
};

