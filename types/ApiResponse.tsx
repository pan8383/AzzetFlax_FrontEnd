// ==============================
// レスポンスエンティティ
// ==============================

/**
 * 通常
 */
export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    error: {
        code: string;
        message: string;
        status: number;
    } | null;
};

/**
 * ページャー用
 */
export type PageResponse<T> = {
    content: T[] | null;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
};

// ==============================
// 認証
// ==============================

/**
 * バックエンドで認証に成功した際のユーザー情報
 * フロント（Login, AuthContext）
 */
export type AuthUser = {
    userId: string;
    name: string;
    email: string;
    roleCode: string;
}

/**
 * ログイン時のレスポンスエンティティ
 */
export type AuthResponse = ApiResponse<AuthUser>;

// ==============================
// レンタル
// ==============================

/**
 * レンタル処理の結果
 */
export type RentalRegisterResult = {
    rentalId: string | null;
    assetId: string;
    success: boolean;
    errorMessage: string | null;
}

/**
 * レンタル処理のレスポンスエンティティ
 */
export type RentalRegisterResponse = ApiResponse<RentalRegisterResult[]>;

