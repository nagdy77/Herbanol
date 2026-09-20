import type { RefObject } from 'react'
import { gsap, useGSAP } from '../utils/motion/gsap'

// Memoize setup with useCallback. Return cleanup for non-GSAP listeners/resources.
export function useScopedMotion(
  scope: RefObject<HTMLElement | null>,
  setup: () => void | (() => void),
) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', setup, scope)
      return () => media.revert()
    },
    { scope, dependencies: [setup], revertOnUpdate: true },
  )
}
