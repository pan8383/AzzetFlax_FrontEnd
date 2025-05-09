'use client';

import { useRouter } from 'next/navigation';

interface LoanActionButtonsProps {
  loanPath: string;
  returnPath: string;
}
export default function LoanActionButtons({ loanPath, returnPath }: LoanActionButtonsProps) {
  const router = useRouter();

  const handleLoan = () => {
    router.push(loanPath); // 貸出画面へ遷移
  };

  const handleReturn = () => {
    router.push(returnPath); // 返却画面へ遷移
  };

  return (
    <div>
      <button onClick={handleLoan}>貸出</button>
      <button onClick={handleReturn}>返却</button>
    </div>
  );
}
