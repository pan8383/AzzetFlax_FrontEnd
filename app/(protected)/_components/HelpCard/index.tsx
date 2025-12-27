'use client'

import styles from './HelpCard.module.css';

export function HelpCard() {
  return (
    <div className={styles.container}>
      <h2 className={styles.blockTitle}>このサイトについて</h2>
      <p>テーマは社内の資産レンタルシステムです。</p>

      <div>
        <h3><a style={{ color: 'red' }} href="/asset">レンタル</a>について</h3>

        <p>管理できる資産は１品ものから複数の資産に対応しています。</p>
        <div>
          <p>例）</p>
          <p>ThinkPad X3 Carbon は １しか</p>
          <p>ThinkPad X1 Carbon は １０在庫</p>
        </div>

      </div>

    </div>
  );
}
