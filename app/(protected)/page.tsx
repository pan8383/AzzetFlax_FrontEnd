'use client';

import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';

export default function Page() {

  // パンくずリスト
  useBreadcrumbs();

  return (
    <>
      <h2>Top Page</h2>
    </>
  );
}