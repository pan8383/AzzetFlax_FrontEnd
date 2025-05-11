'use client';

import RegisterAssetForms from '@/components/ui/RegisterAssetForms';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/asset');
  };

  return (
    <>
      <button onClick={handleBack}>戻る</button>
      <RegisterAssetForms />
    </>
  );
}
