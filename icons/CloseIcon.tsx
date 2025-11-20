'use client';

import { IconProps } from "@/types/iconProps";

export default function CloseIcon({
  stroke = 'currentColor',
  strokeWidth = 2,
  size = 24,
}: IconProps) {
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
      className="lucide lucide-close-icon"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
