'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Register() {
  const router = useRouter();
  const handleHome = () => {
    router.push('/');
  };

  return (
    <>
      <header className={styles.site_header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>MyWebsite</h1>
          <nav className={styles.nav}>
            <ul>
              <li>
                <a onClick={handleHome}>ホーム</a>
              </li>
              <li>
                <a href="#">サービス</a>
              </li>
              <li>
                <a href="#">会社概要</a>
              </li>
              <li>
                <a href="#">お問い合わせ</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
