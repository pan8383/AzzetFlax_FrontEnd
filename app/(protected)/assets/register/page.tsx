'use client';

import RegisterAssetForm from './_components/RegisterAssetForm';
import { useNavigateHome } from '@/components/hooks/useNavigation';

export default function Register() {
  const navigateHome = useNavigateHome();

  return (
    <>
      <button onClick={navigateHome}>戻る</button>
      <RegisterAssetForm />
    </>
  );
}
// http://localhost:3000/asset/register