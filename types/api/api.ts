
// ==============================
// ベース
// ==============================

/**
 * 通常レスポンス用
 */
export type BaseResponse<T> =
  | {
    success: true;
    data: T;
    error: null;
    errorDetails: null;
  }
  | {
    success: false;
    data: null;
    error: {
      code: string;
      message: string;
      status: number;
    };
    errorDetails: string;
  };

/**
 * ページャー用
 */
export type BasePageResponse<T> = {
  content: T[] | null;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};


// ==============================
// 認証関連
// ==============================

/**
 * 認証に成功した際のユーザー情報
 */
export type AuthUser = {
  userId: string;
  name: string;
  email: string;
  role: string;
}

/**
 * ログイン時のレスポンスエンティティ
 */
export type AuthResponse = BaseResponse<AuthUser>;


// ==============================
// ユーザー関連
// ==============================

/**
 * ユーザー
 */
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ユーザー検索
*/
export type UsersResponse = BasePageResponse<User>;

/**
 * ユーザー登録
*/
export type UserCreateResponse = BaseResponse<null>;


// ==============================
// レンタル関連
// ==============================

/**
 * レンタルリクエスト
 */
export type RentalUnitRequest = {
  assetId: string;
  quantity: number;
}

export type RentalCreateRequest = {
  expectedReturnDate: string;
  remarks: string | null;
  assets: RentalUnitRequest[];
}


/**
 * レンタル処理の結果
 */
export type RentalCreateResult = {
  rentalId: string | null;
  expectedReturnDate: string;
  assetResponses: RentalCreateUnits[];
}

type RentalCreateUnits = {
  assetId: string;
  requestedQuantity: number;
  units: RentalCreateUnit[];
}

type RentalCreateUnit = {
  unitId: string;
  success: boolean;
  errorMessage: string;
}


/**
 * レンタル処理のレスポンスエンティティ
 */
export type RentalCreateResponse = BaseResponse<RentalCreateResult>;




// ==============================
// アセット関連
// ==============================

/**
 * アセット
 */
export type Asset = {
  assetId: string;
  name: string;
  categoryCode: string;
  categoryName: string;
  model: string;
  manufacturer: string;
  isAvailable: boolean;
  totalStock: number;
  availableStock: number;
}

export type AssetUnitDetail = {
  // Unit
  unitId: string;
  serialNumber: string;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'BROKEN' | 'DISPOSED';
  purchaseDate: string;
  purchasePrice: number;
  remarks?: string;

  // Location
  locationCode: string;
  locationName: string;

  // Asset
  assetId: string;
  name: string;
  categoryCode: string;
  categoryName: string;
  model: string;
  manufacturer: string;
};



/**
 * アセット登録
*/
export type AssetCreateResponse = BaseResponse<null>;


/**
 * アセット
*/
export type AssetResponse = BasePageResponse<Asset>;


/**
 * アセット詳細
*/
export type AssetUnitResponse = BaseResponse<AssetUnitDetail[]>;


/**
 * カテゴリー
 */
export type Category = {
  categoryCode: string;
  name: string;
  parentCategoryCode: string;
  sortOrder: number;
};

/**
 * カテゴリーのレスポンスエンティティ
 */
export type CategoryResponse = BaseResponse<Category[]>;

/**
 * ロケーション
 */
export type Location = {
  locationCode: string;
  name: string;
  parentCode: string;
  sortOrder: number;
};

/**
 * ロケーションのレスポンスエンティティ
 */
export type LocationsResponse = BaseResponse<Location[]>;



/**
 * レンタルリスト
 */
export type RentalAssetsList = {
  rentalId: string;
  userId: string;
  rentalDate: Date;
  expectedReturnDate: Date;
  actualReturnDate: Date;
  status: string;
  remarks: string;
  units: RentalUnit[];
}

export type RentalUnit = {
  rentalUnitId: string;
  unitId: string;
  rentalUnitStatus: string;
  rentedAt: Date;
  returnedAt: Date;
}

/**
 * レンタル詳細
 */
export type RentalDetail = {
  // Asset
  assetId: string;
  name: string;
  categoryCode: string;
  categoryName: string;
  model: string;
  manufacturer: string;

  // Location
  locationCode: string;
  locationName: string;

  // AssetUnit
  unitId: string;
  serialNumber: string;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'BROKEN' | 'DISPOSED';
  purchaseDate: Date;
  purchasePrice: number;
  remarks: string | null;

  // RentalUnit
  rentalUnitId: string;
  rentalUnitStatus: RentalUnitStatus;
  rentedAt: Date;
  returnedAt: Date | null;
};

export type RentalDetailListResponse = BaseResponse<RentalDetail[]>;


/**
 * enum
 * RENTING,   // レンタル中
 * RETURNED,  // 返却済み
 * CANCELLED; // キャンセル済み
 */
export type RentalUnitStatus = 'RENTING' | 'RETURNED' | 'CANCELLED';
/**
 * レンタル一覧のページャーレスポンスエンティティ
 */
export type RentalListResponse = BasePageResponse<RentalAssetsList>;


/**
 * 返却処理の結果
 */
type RentaReturnResult = {
  rentalId: string;
  status: string;
  returnedUnitCount: number;
  totalUnitCount: number;
}

export type RentalReturnResponse = BaseResponse<RentaReturnResult>;

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