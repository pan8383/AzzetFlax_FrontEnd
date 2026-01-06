'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { getAssetsPath } from '@/components/hooks/useNavigation';
import ShoppingCartIcon from '@/icons/ShoppingCartIcon';

export default function Page() {

  // パンくずリスト
  useBreadcrumbs();

  return (
    <>
      <h2>使い方</h2>

      {/* アウター */}
      <ol className={styles.descriptionList}>
        <li className={styles.descriptionItem}>
          <h3>レンタルしてみましょう</h3>

          {/* インナー */}
          <ol className={styles.subDescriptionList}>
            <li className={styles.subDescriptionItem}>
              ヘッダーメニューにある
              <Link
                className={styles.rentalLink}
                href={getAssetsPath()}
              >
                レンタル
              </Link>
              ボタンをクリックすると<strong>アセット</strong>が一覧表示されます。
            </li>

            <li className={styles.subDescriptionItem}>
              <span
                className={styles.addCartText}
              >
                カートに追加する
              </span>
              ボタンを<strong>クリックする度</strong>にアセットを<strong>カートに追加</strong>できます。
            </li>

            <li className={styles.subDescriptionItem}>
              <strong>１つ以上</strong>のアセットをカートに追加し
              <ShoppingCartIcon />
              のボタンをクリックすると、カート内のアセットを<strong>管理</strong>することができます。
              <br />
              レンタルするアセットの個数の <strong>増減・削除・一括削除</strong> ができます。
            </li>

            <li className={styles.subDescriptionItem}>
              カートの
              <span
                className={styles.rentalLink}
              >
                レンタルする
              </span>
              をクリックすると登録画面に遷移します。
            </li>

            <li className={styles.subDescriptionItem}>
              必要項目を入力し
              <span
                className={styles.addCartText}
              >
                確定する
              </span>
              をクリックするとレンタルした結果画面が表示されます。
            </li>



          </ol>



        </li>
      </ol>
    </>
  );
}