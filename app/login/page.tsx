'use client';

import styles from './page.module.css';
import LoginForm from '@/app/login/_components/LoginForm';
import Loader from 'components/common/Loader';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
