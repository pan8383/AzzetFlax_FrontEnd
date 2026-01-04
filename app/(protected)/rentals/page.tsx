'use client';

import styles from './page.module.css';
import RentalForms from './_components/RentalForms';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { RENTAL } from '@/components/ui/Breadcrumbs/breadcrumbs';

export default function Page() {

  // パンくずリスト
  useBreadcrumbs(RENTAL);

  return (
    <div className={styles.pageLayout}>
      <RentalForms />
    </div>
  );
}
