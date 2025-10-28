import { ReactNode } from "react";

/**
 * 汎用ボタンコンポーネントのプロパティ
 * @property label ボタンに表示する文字
 * @property onClick クリック時の動作
 * @property type HTML button type
 * @property variant 色やデザインのバリエーション
 * @property size ボタンサイズ ('sm' | 'md' | 'lg')
 * @property disabled ボタンを無効化するかどうか
 * @property icon SVGなどのReact要素を渡す
 */
export type TableTitleButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: ReactNode;
}