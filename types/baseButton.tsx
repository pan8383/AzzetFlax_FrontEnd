import { ReactNode } from "react";

/**
 * 汎用ボタンコンポーネントのプロパティ
 */
export type ButtonProps = {
  /** クラス名 */
  className?: string;

  /** ボタンに表示する文字 */
  label?: string;

  /** ボタンの種類（HTML の type 属性） */
  type?: 'button' | 'submit';

  /** 色やデザインのバリエーション */
  variant?: 'white' | 'dark' | 'danger';

  /** ボタンサイズ */
  size?: 'sm' | 'md' | 'lg';

  /** ボタン内に表示するアイコン（React 要素） */
  icon?: ReactNode;

  /** ボタンを無効化するかどうか */
  disabled?: boolean;

  /** ボタンをホバーさせるかどうか */
  hoverable?: boolean;

  /** クリック時のコールバック関数 */
  onClick?: () => void;
};
