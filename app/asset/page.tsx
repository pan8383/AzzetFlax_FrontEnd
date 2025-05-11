'use client';

import Assets from '@/components/ui/Assets';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <button onClick={handleBack}>戻る</button>
      <Assets />
    </>
  );
}
