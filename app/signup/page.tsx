'use client';

import styles from './page.module.css';
import LoginForm from '@/app/login/_components/LoginForm';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <LoginForm />
    </div>
  );
}
