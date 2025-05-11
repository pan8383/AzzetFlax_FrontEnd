'use client';

import LoanActionButtons from '@/components/ui/RentalActionButtons';
import AssetActionButtons from '@/components/ui/AssetActionButtons/AssetActionButtons.modules';

export default function Home() {
  return (
    <>
      <AssetActionButtons assetPath="/asset" />
      <LoanActionButtons loanPath="/rental" returnPath="/return" />
    </>
  );
}
