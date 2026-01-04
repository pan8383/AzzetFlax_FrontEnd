'use client';

import styles from './Breadcrumbs.module.css';
import Link from 'next/link';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumb();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className={styles.breadcrumb}>
      <ol>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
