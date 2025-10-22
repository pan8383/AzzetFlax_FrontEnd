'use client';

import { useRouter } from 'next/navigation';
import styles from './RentalActionButtons.module.css';

interface LoanActionButtonsProps {
  loanPath: string;
  returnPath: string;
}
export default function LoanActionButtons({ loanPath, returnPath }: LoanActionButtonsProps) {
  const router = useRouter();

  const handleLoan = () => {
    router.push(loanPath);
  };

  const handleReturn = () => {
    router.push(returnPath);
  };

  return (
    <div className={styles.rental_acction_container}>
      <button onClick={handleLoan}>借りる</button>
      <button onClick={handleReturn}>返す</button>
    </div>
  );
}
