'use client';

import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <header className={styles.site_header}>
      <div className={styles.container}>
        <h1 className={styles.title} >
          <Link href="/test">
            Test
          </Link>
        </h1>
      </div>
    </header>
  );
}
