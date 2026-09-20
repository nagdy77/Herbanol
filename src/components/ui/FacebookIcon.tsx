import type { SVGProps } from 'react'

// Social mark, separate from the pending Herbanol brand logo.
export default function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 12a10 10 0 1 0-11.563 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988A10.003 10.003 0 0 0 22 12Z" />
    </svg>
  )
}
