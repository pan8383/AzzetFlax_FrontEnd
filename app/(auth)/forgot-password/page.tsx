'use client';

import styles from './page.module.css';
import ForgotPasswordForm from './_components/ForgotPasswordForm';

export default function Page() {
  return (
    <div className={styles.pageLayout}>
      <ForgotPasswordForm />
    </div>
  );
}
