'use client';

import styles from './UserTableView.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from '@/components/common/BaseTable';
import { User } from '@/types/api/api';
import { formatDate, formatDateTime } from '@/utils/formatDate';


type Props = {
  users: User[];
  //updateQueryParams: (updater: (prev: AssetsQueryParams) => AssetsQueryParams) => void;
  totalPages?: number;
}

type UserTableColumn = User & {
};

export default function UserTableView({ users, totalPages }: Props) {
  const columnHelper = createColumnHelper<UserTableColumn>();
  const columns: ColumnDef<UserTableColumn, any>[] = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor('name', {
      header: '名前',
      enableSorting: false,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('role', {
      header: '権限',
    }),
    columnHelper.accessor('createdAt', {
      header: '作成日時',
      minSize: 60,
      cell: ({ getValue }) => formatDateTime(getValue()),
    }),
    columnHelper.accessor('updatedAt', {
      header: '更新日時',
      minSize: 60,
      cell: ({ getValue }) => formatDateTime(getValue()),
    }),
  ]


  if (users.length === 0) return <div>データがありません。</div>;

  return (
    <BaseTable<UserTableColumn>
      data={users}
      columns={columns}
      totalPages={totalPages}
    />
  );
}
