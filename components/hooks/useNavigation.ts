import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

//
// =======================
// API PATH
// =======================
// auth
export const getLoginApiPath = () => ROUTES.api.auth.login;
export const getLogoutApiPath = () => ROUTES.api.auth.logout;
export const getSignupApiPath = () => ROUTES.api.auth.signup;
export const getRefreshApiPath = () => ROUTES.api.auth.refresh;

// assets
export const getAssetsApiPath = () => ROUTES.api.assets.list;
export const getAssetCreateApiPath = () => ROUTES.api.assets.create;
export const getAssetUpdateApiPath = () => ROUTES.api.assets.update;
export const getAssetDeleteApiPath = (assetId: string) => ROUTES.api.assets.assetDelete(assetId);

// asset-units
export const getAssetUnitsApiPath = (assetId: string) => ROUTES.api.assets.unitsList(assetId);
export const getAssetUnitsCreateApiPath = (assetId: string) => ROUTES.api.assets.unitsCreate(assetId);
export const getAssetUnitsUpdateApiPath = () => ROUTES.api.assets.unitUpdate;
export const getAssetUnitsDeleteApiPath = (unitId: string) => ROUTES.api.assets.unitDelete(unitId);

// users
export const getUsersApiPath = () => ROUTES.api.users.list;

// rentals
export const getRentalsApiPath = () => ROUTES.api.assets.rentals.list;
export const getRentalDetailsApiPath = (rentalId: string) => ROUTES.api.assets.rentals.detail(rentalId);
export const getRentalsCreateApiPath = () => ROUTES.api.assets.rentals.create;
export const getRentalsReturnApiPath = () => ROUTES.api.assets.rentals.return;

// category
export const getCategoryListApiPath = () => ROUTES.api.category.list;

// locations
export const getLocationsListApiPath = () => ROUTES.api.locations.list;


//
// =======================
// ROUTE PATH
// =======================
// home
export const getHomePath = () => ROUTES.route.home;

// auth
export const getLoginPath = () => ROUTES.route.auth.login;
export const getForgotPasswordPath = () => ROUTES.route.auth.forgotPassword;

// admin
export const getAdminHomePath = () => ROUTES.route.admin.home;
export const getAdminUsersPath = () => ROUTES.route.admin.users;
export const getAdminAssetsPath = () => ROUTES.route.admin.assets.list;
export const getAdminAssetDetailPath = (assetId: string) =>
  ROUTES.route.admin.assets.detail(assetId);
export const getAdminAssetUnitDetailPath = (assetId: string, unitId: string) =>
  ROUTES.route.admin.assets.detailUnit(assetId, unitId);

// assets
export const getAssetsPath = () => ROUTES.route.assets.list;

// rentals
export const getRentalPath = () => ROUTES.route.rentals.create;
export const getRentalListPath = () => ROUTES.route.rentals.list;
export const getRentalDetailPath = (rentalId: string) => ROUTES.route.rentals.detail(rentalId);
export const getRentalReturnPath = () => ROUTES.route.rentals.return;


//
// =======================
// NAVIGATION HOOK
// =======================
const useNavigateTo = (path: string) => {
  const router = useRouter();
  return () => router.push(path);
};

// home
export const useNavigateHome = () =>
  useNavigateTo(getHomePath());

// auth
export const useNavigateLogin = () =>
  useNavigateTo(getLoginPath());

export const useNavigateForgotPassword = () =>
  useNavigateTo(getForgotPasswordPath());

// admin
export const useNavigateAdminHome = () =>
  useNavigateTo(getAdminHomePath());

export const useNavigateAdminUsers = () =>
  useNavigateTo(getAdminUsersPath());

export const useNavigateAdminAssets = () =>
  useNavigateTo(getAdminAssetsPath());

export const useNavigateAssetAdminDetail = () => {
  const router = useRouter();
  return (assetId: string) => {
    router.push(getAdminAssetDetailPath(assetId));
  };
};

export const useNavigateAssetAdminUnitDetail = () => {
  const router = useRouter();
  return (assetId: string, unitId: string) => {
    router.push(getAdminAssetUnitDetailPath(assetId, unitId));
  };
};

export const useNavigateAssets = () =>
  useNavigateTo(getAssetsPath());

// rentals
export const useNavigateRental = () =>
  useNavigateTo(getRentalPath());

export const useNavigateRentalList = () =>
  useNavigateTo(getRentalListPath());

export const useNavigateRentalReturn = () =>
  useNavigateTo(getRentalReturnPath());

export const useNavigateRentalListDetail = () => {
  const router = useRouter();
  return (rentalId: string) => {
    router.push(getRentalDetailPath(rentalId));
  };
};
