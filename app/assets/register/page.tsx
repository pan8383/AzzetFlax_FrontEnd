'use client';

import CategoriesRegisterForm from 'components/ui/CategoriesRegisterForm';
import RegisterAssetForm from './_components/RegisterAssetForm';
import { useRouter } from 'next/navigation';
import CategoriesList from 'components/ui/CategoriesList';

export default function Register() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/assets');
  };

  return (
    <>
      <button onClick={handleBack}>戻る</button>
      <RegisterAssetForm />
      <CategoriesRegisterForm />
    </>
  );
}
