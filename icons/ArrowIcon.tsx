'use client';

import { IconProps } from "@/types/iconProps";

type ArrowDirection = 'up' | 'down' | 'left' | 'right';

type ArrowIconProps = IconProps & {
  direction?: ArrowDirection;
};

export default function ArrowIcon({
  stroke = 'currentColor',
  strokeWidth = 2,
  size = 24,
  direction = 'right',
}: ArrowIconProps) {

  const rotation = {
    right: 'rotate(0)',
    left: 'rotate(180deg)',
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
  }[direction];

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
      style={{ transform: rotation, transition: 'transform 0.2s ease' }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
