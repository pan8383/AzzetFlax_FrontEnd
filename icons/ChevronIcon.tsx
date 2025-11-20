'use client';

import { IconProps } from "@/types/iconProps";

type ChevronDirection = 'up' | 'down' | 'left' | 'right';

type ChevronIconProps = IconProps & {
  direction?: ChevronDirection;
};

export default function ChevronIcon({
  stroke = 'currentColor',
  strokeWidth = 2,
  size = 24,
  direction = 'right',
}: ChevronIconProps) {

  const rotation = {
    right: 'rotate(0deg)',
    left: 'rotate(180deg)',
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
  }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: rotation, transition: 'transform 0.2s ease' }}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
