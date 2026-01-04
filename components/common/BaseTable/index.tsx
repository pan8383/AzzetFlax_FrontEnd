'use client'

import styles from './BaseTable.module.css'
import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'

export type SortDirection = 'asc' | 'desc'
export type ColumnSort = {
  id: string;
  desc: boolean;
}

export type SortingState = ColumnSort[]

type BaseTableProps<T, K extends keyof T = keyof T> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  onSort?: (field: Extract<K, string>, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  totalPages?: number;
  initialSorting?: SortingState
}

export function BaseTable<T>({
  columns,
  data,
  onSort,
  onRowClick,
  totalPages,
  initialSorting = [],
}: BaseTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      pagination,
    },
    columnResizeMode: 'onChange',
    enableSorting: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    pageCount: totalPages,
    manualPagination: true,
    onSortingChange: (updater) => {
      let newSorting: SortingState = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);

      // サーバーに問い合わせ
      if (onSort && newSorting.length > 0) {
        const firstSort = newSorting[0];
        onSort(firstSort.id as Extract<keyof T, string>, firstSort.desc ? 'desc' : 'asc');
      }
    },
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  <div
                    className={styles.sortHeader}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    <span className={styles.sortArrow}>
                      {{
                        asc: '↑',
                        desc: '↓',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </span>
                  </div>

                  <div
                    className={styles.resizeHandle}
                    onMouseDown={header.getResizeHandler()}
                    onClick={e => e.stopPropagation()}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
