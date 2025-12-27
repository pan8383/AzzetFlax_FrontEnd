'use client';

import styles from './page.module.css';
import LoginForm from './_components/LoginForm';

export default function Page() {
  return (
    <div className={styles.pageLayout}>
      <LoginForm />
    </div>
  );
}
