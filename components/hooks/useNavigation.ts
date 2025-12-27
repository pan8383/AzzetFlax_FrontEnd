import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';


// =======================
// API パス 
// =======================

// auth
export const useLoginApiPath = () => ROUTES.api.auth.login;
export const useLogoutApiPath = () => ROUTES.api.auth.logout;
export const useSignupApiPath = () => ROUTES.api.auth.signup;
export const useRefreshApiPath = () => ROUTES.api.auth.refresh;

// assets
export const useAssetsApiPath = () => ROUTES.api.assets.list;

// users
export const useUsersApiPath = () => ROUTES.api.users.list;
export const useUsersCreateApiPath = () => ROUTES.api.users;



// ---------- パス ----------
// home
export const useHomePath = () => ROUTES.route.home;
// admin
export const useAdminPath = () => ROUTES.route.admin.home;
export const useAssetManagementPath = () => ROUTES.route.admin.assets;
export const useUserManagementPath = () => ROUTES.route.admin.users;

// auth
export const useLoginPath = () => ROUTES.route.auth.login;
export const useForgotPasswordPath = () => ROUTES.route.auth.forgotPassword;

// users
export const useUsersPath = () => ROUTES.route.admin.users;


// assets
export const useAssetPath = () => ROUTES.route.assets.list;
export const useRentalHistoryPath = () => ROUTES.route.rentals.list;

// rental
export const useRentalReturnPath = () => ROUTES.route.rentals.list;

// category
export const useCategoryListPath = () => ROUTES.api.category.list;








// ---------- 共通 ----------
const useNavigateTo = (path: string): (() => void) => {
  const router = useRouter();
  return () => router.push(path);
};

// ---------- ホーム ----------
export const useNavigateHome = () => {
  return useNavigateTo(useHomePath());
};

// ---------- 管理者ページ ----------
export const useNavigateAdmin = () => {
  return useNavigateTo(useAdminPath());
};

// ---------- 認証 ----------
export const useNavigateLogin = () => {
  return useNavigateTo(useLoginPath());
};

export const useNavigateSignup = () => {
  return useNavigateTo(useLoginPath());
};

export const useNavigateForgotPassword = () => {
  return useNavigateTo(useForgotPasswordPath());
};



// ---------- user ----------
export const useNavigateUsers = () => {
  return useNavigateTo(useUsersPath());
};




// ---------- asset ----------
export const useNavigateAssets = () => {
  return useNavigateTo(useAssetPath());
};


export const useNavigateAssetsDeleteConfirm = () => {
  return useNavigateTo('/asset/delete/confirm');
};

// ---------- asset ----------



// ---------- Rental ----------
export const useNavigateRental = () => {
  return useNavigateTo('/rental');
};
export const useNavigateRentalReturn = () => {
  return useNavigateTo(useRentalReturnPath());
};



export const useNavigateRentalHistory = () => {
  return useNavigateTo(useRentalHistoryPath());
};

export const useNavigateRentalHistoryDetail = () => {
  const router = useRouter();
  return (rentalId: string) => {
    router.push(useRentalHistoryPath() + `/${rentalId}`);
  };
};