'use client';

import styles from './page.module.css';
import RentalForms from './_components/RentalForms';
import BaseButton from '@/components/common/BaseButton';
import { useNavigateHome } from '@/components/hooks/useNavigation';

export default function Register() {
  const navigateHome = useNavigateHome();

  return (
    <div className={styles.pageContainer}>
      <BaseButton
        label='戻る'
        size='sm'
        variant='dark'
        onClick={navigateHome}
        hoverable
      />
      <RentalForms />
    </div>
  );
}
