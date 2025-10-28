
/**
 * @param stroke - 線の色
 * @param strokeWidth - 線の太さ
 * @param size - 幅・高さ
 */
export type IconProps = {
  stroke?: string;
  strokeWidth?: number;
  size?: number;
};

/**
 * @param direction - 上下左右反転
 */
export type ArrowIconProps = IconProps & {
  direction?: 'up' | 'down' | 'left' | 'right';
};