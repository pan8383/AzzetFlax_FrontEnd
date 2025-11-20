import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

// ---------- パス ----------
export const useHomePath = () => ROUTES.home
export const useLoginPath = () => ROUTES.login
export const useLogoutPath = () => ROUTES.logout
export const useSignupPath = () => ROUTES.signup
export const useAssetPath = () => ROUTES.asset.list;
export const useUserRegisterPath = () => ROUTES.user.register;
export const useRentalRegisterPath = () => ROUTES.rental.register;
export const useRentalHistoryPath = () => ROUTES.rental.history;

// ---------- 共通 ----------
const useNavigateTo = (path: string): (() => void) => {
  const router = useRouter();
  return () => router.push(path);
};

// ---------- ホーム ----------
export const useNavigateHome = () => {
  return useNavigateTo(useHomePath());
};


// ---------- Auth ----------
export const useNavigateLogin = () => {
  return useNavigateTo(useLoginPath());
};

export const useNavigateLogout = () => {
  return useNavigateTo(useLogoutPath());
};

export const useNavigateSignup = () => {
  return useNavigateTo(useLoginPath());
};


// ---------- user ----------
export const useNavigateUser = () => {
  return useNavigateTo("");
};

export const useNavigateUserRegister = () => {
  return useNavigateTo(useUserRegisterPath());
};


// ---------- asset ----------
export const useNavigateAssets = () => {
  return useNavigateTo(useAssetPath());
};

export const useNavigateAssetsRegister = () => {
  return useNavigateTo('/assets/register');
};

export const useNavigateAssetsDeleteConfirm = () => {
  return useNavigateTo('/asset/delete/confirm');
};

// ---------- Rental ----------
export const useNavigateRental = () => {
  return useNavigateTo('/rental');
};

export const useNavigateRentalHistory = () => {
  return useNavigateTo(useRentalHistoryPath());
};
