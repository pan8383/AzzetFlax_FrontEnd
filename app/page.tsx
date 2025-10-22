'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <Link href="/assets" className={styles.linkButton}>
        資産一覧
      </Link>
      <Link href="/assets/register" className={styles.linkButton}>
        資産登録
      </Link>

      <Link href="/users/register" className={styles.linkButton}>
        ユーザー登録
      </Link>
    </div>
  );
}
