
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
export type CreateRentalRequest = {
  assetId: string;
  quantity: number;
  due: string;
  remarks: string | null;
}

/**
 * レンタル処理の結果
 */
export type RentalCreateResult = {
  rentalId: string | null;
  assetId: string;
  success: boolean;
  message: string | null;
}

/**
 * レンタル処理のレスポンスエンティティ
 */
export type RentalCreateResponse = BaseResponse<RentalCreateResult[]>;




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

/**
 * アセット登録
*/
export type AssetCreateResponse = BaseResponse<null>;


/**
 * アセット
*/
export type AssetResponse = BasePageResponse<Asset>;


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
 * レンタル履歴
 */
export type RentalHistory = {
  rentalId: string;
  assetId: string;
  unitId: string;
  due: Date;
  remarks: string;
  returnAt: Date | null;
  status: string;
  createdAt: Date;
}

/**
 * レンタル履歴のページャーレスポンスエンティティ
 */
export type RentalHistoryResponse = BasePageResponse<RentalHistory>;


/**
 * 返却処理の結果
 */
type RentaReturnResult = {
  rentalId: string | null;
  success: boolean;
  errorMessage: string | null;
}
export type RentalReturnResponse = BaseResponse<RentaReturnResult>;