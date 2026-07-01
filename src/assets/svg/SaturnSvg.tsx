// src/assets/svg/SaturnSvg.tsx
import type { ComponentPropsWithoutRef } from "react"

interface SaturnSvgProps extends ComponentPropsWithoutRef<"svg"> {
  size?: number
}

export default function SaturnSvg({ size = 64, className = "", ...props }: SaturnSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`drop-shadow-[0_4px_10px_rgba(34,211,238,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(217,70,239,0.6)] group-hover:rotate-12 transition-all duration-500 ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M12 38C8 36 6 33 8 30c3-4 15-7 29-6 8 1 15 3 18 6" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <circle cx="32" cy="32" r="16" fill="url(#planetGrad)" />
      <path d="M56 32c3 3 1 6-5 8-7 2-19 3-31 1-10-2-15-5-13-8" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 27c6 2 15 2 22 0" fill="none" stroke="#0f172a" strokeWidth="1" opacity="0.3" />
      <path d="M16 34c8 3 20 2 27-1" fill="none" stroke="#0f172a" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}
