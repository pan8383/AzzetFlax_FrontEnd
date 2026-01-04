'use client';

import styles from './page.module.css';
import SignupForm from './_components/SignupForm/SignupForm';
import UserTableView from './_components/UserTableView';
import { useUsers } from '@/components/hooks/useUsers';
import Loader from '@/components/common/Loader';
import TableTitleButton from '@/components/common/TableTitleButton';
import CrownIcon from '@/icons/CrownIcon';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { ADMIN_USER_LIST } from '@/components/ui/Breadcrumbs/breadcrumbs';

export default function Page() {
	const { users, pageInfo, loading, fetchError, updateQueryParams } = useUsers(50);

	// パンくずリスト
	useBreadcrumbs(ADMIN_USER_LIST);

	const refreshUsers = () => {
		updateQueryParams(prev => ({ ...prev }));
	};

	return (
		<div className={styles.pageLayout}>
			{/* タイトル */}
			<TableTitleButton
				label="ユーザー管理"
				icon={<CrownIcon stroke="var(--primary)" />}
				disabled
			/>

			{/* 新規ユーザー登録 */}
			<div className={styles.form}>
				<SignupForm refreshUsers={refreshUsers} />
			</div>

			<hr />

			{/* ユーザーリスト */}
			<div className={styles.userList}>
				<h3 className={styles.userListTitle}>ユーザーリスト</h3>
				{loading ? <Loader /> : (
					<UserTableView users={users} />
				)}
			</div>

		</div>
	);
}
