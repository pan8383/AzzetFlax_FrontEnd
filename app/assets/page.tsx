'use client';

import AssetsLists from './_components/AssetsLists';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Register() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        戻る
      </button>
      <AssetsLists />
    </div>
  );
}
