import { useEffect } from 'react';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { BreadcrumbItem } from '@/types/breadcrumb';

export function useBreadcrumbs(items?: BreadcrumbItem[]) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs(items ?? []);
  }, [items, setBreadcrumbs]);
}