'use client';

import { IconProps } from "@/types/iconProps";

export default function BellDotIcon({
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
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path
        d="M13.916 2.314
           A6 6 0 0 0 6 8
           c0 4.499-1.411 0.956-2.74 7.327
           A1 1 0 0 0 4 17
           h16
           a1 1 0 0 0 .74-1.673
           9 9 0 0 1-.585-.665"
      />
      <circle cx="18" cy="8" r="3" />
    </svg>
  );
}
