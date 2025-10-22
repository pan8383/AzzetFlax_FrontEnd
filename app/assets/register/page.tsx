'use client';

import RegisterAssetForm from './_components/RegisterAssetForm';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/asset');
  };

  return (
    <>
      <button onClick={handleBack}>戻る</button>
      <RegisterAssetForm />
    </>
  );
}
