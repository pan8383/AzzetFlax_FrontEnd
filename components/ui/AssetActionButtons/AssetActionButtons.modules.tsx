'use client';

import { useRouter } from 'next/navigation';

interface AssetActionButtonsProps {
  assetPath: string;
}
export default function AssetActionButtons({ assetPath }: AssetActionButtonsProps) {
  const router = useRouter();

  const handleRegister = () => {
    router.push(assetPath);
  };

  return (
    <div>
      <button onClick={handleRegister}>資材一覧</button>
    </div>
  );
}
