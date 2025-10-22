'use client';

import { ConfirmModalProps } from '@/types/modal';

export default function ConfirmModal({ isOpen, onConfirm, onCancel, message }: ConfirmModalProps) {
	if (!isOpen) return null;

	return (
		<div>
			<p>{message || 'この操作を実行してもよろしいですか？'}</p>
			<button onClick={onCancel}>キャンセル</button>
			<button onClick={onConfirm}>実行</button>
		</div>
	);
}
