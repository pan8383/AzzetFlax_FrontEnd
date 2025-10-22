'use client';

import styles from './page.module.css';
import SignupForm from '@/app/users/register/_components/SignupForm';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.ctas}>
					<SignupForm />
				</div>
			</main>
		</div>
	);
}
