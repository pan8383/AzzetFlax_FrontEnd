import { useRouter } from 'next/navigation';

// ---------- 共通 ----------
const useNavigateTo = (path: string): (() => void) => {
  const router = useRouter();
  return () => router.push(path);
};

// ---------- ホーム ----------
export const useNavigateHome = () => {
  return useNavigateTo('/');
};

// ---------- asset ----------
export const useNavigateAssets = () => {
  return useNavigateTo('/assets');
};

export const useNavigateAssetsRegister = () => {
  return useNavigateTo('/assets/register');
};

export const useNavigateAssetsDeleteConfirm = () => {
  return useNavigateTo('/asset/delete/confirm');
};

// ---------- asset ----------
