import { getAdminAssetDetailPath, getAdminAssetsPath, getAdminAssetUnitDetailPath, getAdminHomePath, getAssetsPath, getHomePath, getRentalListPath } from '@/components/hooks/useNavigation';
import { BreadcrumbItem } from '@/types/breadcrumb';

// ==============================
// 共通
// ==============================

const TOP: BreadcrumbItem = {
  label: 'TOP',
  href: getHomePath(),
};

const ADMIN_TOP: BreadcrumbItem = {
  label: '管理者ページ',
  href: getAdminHomePath(),
};

export const ASSET_LIST: BreadcrumbItem[] = [
  TOP,
  { label: 'レンタル' },
];

export const RENTAL: BreadcrumbItem[] = [
  TOP,
  { label: 'レンタル', href: getAssetsPath() },
  { label: 'カート' },
];

export const RETURN_LIST: BreadcrumbItem[] = [
  TOP,
  { label: '返す' },
];

export const RENTAL_LIST: BreadcrumbItem[] = [
  TOP,
  { label: 'レンタル履歴' },
];

export const RENTAL_LIST_DETAIL = (rentalId: string): BreadcrumbItem[] => [
  TOP,
  { label: 'レンタル履歴', href: getRentalListPath() },
  { label: `レンタルID#${rentalId}` },
];

export const ADMIN_PAGE: BreadcrumbItem[] = [
  TOP,
  { label: '管理者ページ' },
];

export const ADMIN_USER_LIST: BreadcrumbItem[] = [
  TOP,
  ADMIN_TOP,
  { label: 'ユーザー管理' },
];

export const ADMIN_ASSET_LIST: BreadcrumbItem[] = [
  TOP,
  ADMIN_TOP,
  { label: 'アセット管理' },
];

export const ADMIN_ASSET_DETAIL = (assetId: string): BreadcrumbItem[] => [
  TOP,
  ADMIN_TOP,
  { label: 'アセット管理', href: getAdminAssetsPath() },
  { label: `アセットID#${assetId}` },
];

export const ADMIN_ASSET_UNIT_DETAIL = (
  assetId: string,
  unitId: string
): BreadcrumbItem[] => [
    TOP,
    ADMIN_TOP,
    { label: 'アセット管理', href: getAdminAssetsPath() },
    { label: `アセットID#${assetId}`, href: getAdminAssetDetailPath(assetId) },
    { label: `ユニットID#${unitId}` },
  ];