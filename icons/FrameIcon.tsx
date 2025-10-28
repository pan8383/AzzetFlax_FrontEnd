'use client';

import { IconProps } from '@/types/iconProps';

export default function FrameIcon({
  stroke = 'currentColor',
  strokeWidth = 2,
  size = 24,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="22" y1="6" x2="2" y2="6" />
      <line x1="22" y1="18" x2="2" y2="18" />
      <line x1="6" y1="2" x2="6" y2="22" />
      <line x1="18" y1="2" x2="18" y2="22" />
    </svg>
  );
}
