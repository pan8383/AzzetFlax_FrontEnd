'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import GithubIcon from '@/icons/GithubIcon';

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <Link
        className={styles.githubLinkBtn}
        href="https://github.com/pan8383"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
        @pan8383
      </Link>
    </footer>
  );
}
