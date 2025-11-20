'use client';

import styles from './page.module.css';

import BaseButton from '@/components/common/BaseButton';
import Grid2x2Icon from '@/icons/Grid2x2Icon';

export default function Home() {
	return (
		<div className={styles.container}>
			<p>Test</p>
			<a href="/users/register">aaa</a>
			<BaseButton icon={<Grid2x2Icon />} size='lg' variant='dark' label='カートを空にする' />
			<BaseButton icon={<Grid2x2Icon />} size='md' variant='dark' label='カートを空にする' />
			<BaseButton icon={<Grid2x2Icon />} size='sm' variant='dark' label='カートを空にする' />
			<BaseButton disabled icon={<Grid2x2Icon stroke="var(--secondary)" />} size='sm' variant='dark' label='カートを空にする' />

			<BaseButton className={styles.button} label='カートを空にする' />
			<BaseButton size='md' variant='dark' label='カートを空にする' />
			<BaseButton size='sm' variant='dark' label='カートを空にする' />
		</div>
	);
}
