import { useRouter } from 'next/navigation';
import styles from './LoginModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    router.push('/login');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>ログインが必要です</h2>
        <p className={styles.message}>続行するにはログインしてください。</p>
        <button className={styles.button} onClick={handleLoginClick}>
          ログインページへ
        </button>
      </div>
    </div>
  );
}
