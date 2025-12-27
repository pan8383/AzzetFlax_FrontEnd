'use client';

import styles from './ForgotPasswordForm.module.css';

export default function ForgotPasswordForm() {
	return (
		<div className={styles.card}>
			<p>このサービスでは個人情報を保持しないため、
				<br /> パスワード再設定機能は提供していません。
				<br />忘れた場合は再登録してください。
			</p>
		</div >
	);
}
