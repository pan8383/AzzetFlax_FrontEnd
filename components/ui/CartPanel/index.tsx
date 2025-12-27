'use client';

import styles from './CartPanel.module.css';
import { useCart } from '@/contexts/RentalCartContext';
import CloseIcon from '@/icons/CloseIcon';
import BaseButton from '@/components/common/BaseButton';
import BrushCleaningIcon from '@/icons/BrushCleaningIcon';
import { useNavigateRental } from '@/components/hooks/useNavigation';

type CartPanelProps = {
  onClose?: () => void;
};

export default function CartPanel({ onClose }: CartPanelProps) {
  const navigateRental = useNavigateRental();
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();


  /** カートを空にする処理 */
  const handleRemoveCart = () => {
    const confirmed = window.confirm('カートを空にしますか？');
    if (confirmed) {
      clearCart();
      onClose?.();
    }
  };

  /** レンタル画面へ遷移する処理 */
  const handleRentalNavigation = () => {
    onClose?.();
    navigateRental();
  };

  return (
    <div className={styles.panel}>
      {/* クローズボタン */}
      {onClose && (
        <BaseButton
          className={styles.closeButton}
          icon={<CloseIcon size={30} />}
          onClick={onClose}
        />
      )}

      <h2 className={styles.title}>カート</h2>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>カートは空です。</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.assetId} className={styles.item}>
                <div className={styles.itemInfo}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.stock}>在庫: {item.availableStock}</span>
                </div>

                <div className={styles.controls}>
                  <BaseButton
                    className={styles.qtyBtn}
                    label="−"
                    disabled={item.quantity <= 1}
                    onClick={() => decreaseQuantity(item.assetId)}
                  />

                  <span className={styles.quantity}>{item.quantity}</span>

                  <BaseButton
                    className={styles.qtyBtn}
                    label="＋"
                    disabled={item.quantity >= item.availableStock}
                    onClick={() => increaseQuantity(item.assetId)}
                  />

                  <BaseButton
                    className={styles.removeBtn}
                    label="削除"
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.assetId)}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.rentals}>
            <BaseButton
              label="カートを空にする"
              variant="danger"
              size="sm"
              onClick={handleRemoveCart}
              icon={<BrushCleaningIcon />}
            />
            <BaseButton
              label="レンタルする"
              variant="dark"
              size="md"
              onClick={handleRentalNavigation}
            />
          </div>
        </>
      )}
    </div>
  );
}
